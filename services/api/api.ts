import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { Platform } from "react-native";

// --- base client ------------------------------------------------------------
const TIMEOUT = __DEV__ ? 40000 : 10000;

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: TIMEOUT,
  withCredentials: Platform.OS === "android" ? false : true,
});

// raw client (no interceptors) used *only* for refresh request
const raw = axios.create({
  baseURL: api.defaults.baseURL,
  timeout: TIMEOUT,
});

// --- helpers ----------------------------------------------------------------
function fullUrl(baseURL?: string, url?: string) {
  return `${baseURL ?? ""}${url ?? ""}`;
}

function setAuthHeader(
  headers: InternalAxiosRequestConfig["headers"],
  token: string
) {
  const normalized =
    headers instanceof AxiosHeaders
      ? headers
      : AxiosHeaders.from(headers ?? {});
  normalized.set("Authorization", `Bearer ${token}`);
  return normalized;
}

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// --- refresh state (queue concurrent 401s) ----------------------------------
let isRefreshing = false;
let queue: Array<(token: string) => void> = [];

const subscribe = (cb: (t: string) => void) => queue.push(cb);
const broadcast = (token: string) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

async function doRefresh(): Promise<{ access: string; refresh: string }> {
  console.log("doRefresh data");
//   const userId = await SecureStorageHelper.getUserId();
const userId='1';
const refreshToken='1';
//   const refreshToken = await SecureStorageHelper.getRefreshToken();

  if (!userId || !refreshToken) throw new Error("Missing refresh credentials");

  // refresh endpoint is @Public → no AT needed; use `raw` to avoid loops
  const { data } = await raw.post(`/auth/refresh/${userId}`, {
    refresh_token: refreshToken,
  });

  const newAT: string | undefined = data?.data?.access_token;
  const newRT: string | undefined = data?.data?.refresh_token;
  if (!newAT || !newRT) throw new Error("Bad refresh response");
  // persist both (they are already encrypted by server)
//   await SecureStorageHelper.setToken(newAT);
//   await SecureStorageHelper.setRefreshToken(newRT);

  return { access: newAT, refresh: newRT };
}

// --- interceptors -----------------------------------------------------------

// REQUEST: attach encrypted AT (your guard will decrypt server-side)
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = '88';
    if (token) config.headers = setAuthHeader(config.headers, token);
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE: unified handler + refresh logic
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<any>) => {
    // No response (network, CORS, server down)
    if (!error.response) {
      return Promise.reject({ ...error, isNetworkError: true });
    }

    const cfg = (error.config ?? {}) as RetriableConfig;
    const status = error.response.status;
    const url = fullUrl(cfg.baseURL, cfg.url);
    const isAuthRoute =
      (cfg.url ?? "").startsWith("/auth/") ||
      (cfg.url ?? "").includes("/auth/");

    // Non-auth failures → bubble up
    if (status !== 401 && status !== 403) {
      // optional log:
      // console.error("❌ API Error:", { url, status, data: error.response.data });
      return Promise.reject(error.response.data?.message ?? error);
    }

    // Avoid loops: don't refresh on auth routes or already retried requests
    if (isAuthRoute || cfg._retry) {
      return Promise.reject(error.response.data?.message ?? error);
    }

    // Mark as retried
    cfg._retry = true;

    // If a refresh is already happening, queue this request
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribe((newAT) => {
          cfg.headers = setAuthHeader(cfg.headers, newAT);
          resolve(api(cfg));
        });
      });
    }

    // Start refresh
    isRefreshing = true;

    try {
      const { access } = await doRefresh();

      // Notify queued requests
      broadcast(access);

      // Retry the original request with the new AT
      cfg.headers = setAuthHeader(cfg.headers, access);
      return api(cfg);
    } catch (e) {
      // Refresh failed → clear tokens, tag error as auth-expired
   

      const err = new Error("Session expired");
      (err as any).isAuthExpired = true; // your Auth layer can catch this and signOut()
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);
