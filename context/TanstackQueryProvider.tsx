// src/context/TanstackQueryProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
    focusManager,
    onlineManager,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import React, { PropsWithChildren } from "react";
import { AppState } from "react-native";

// -----------------------------
// 1) Focus management (AppState)
// -----------------------------
focusManager.setEventListener((handleFocus) => {
  const subscription = AppState.addEventListener("change", (state) => {
    handleFocus(state === "active");
  });

  return () => subscription.remove();
});

// -----------------------------------
// 2) Online status (single source of truth)
// -----------------------------------
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    const online =
      !!state.isConnected &&
      (state.isInternetReachable === null ||
        state.isInternetReachable === true);

    setOnline(online);
  });
});

// -----------------------------
// 3) QueryClient instance
// -----------------------------
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24h
      staleTime: 1000 * 60 * 5, // 5 minutes
      networkMode: "offlineFirst",
      retry: 1,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    mutations: {
      networkMode: "offlineFirst",
    },
  },
});

// -----------------------------
// 4) Persist to AsyncStorage
// -----------------------------
const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "REACT_QUERY_OFFLINE_CACHE",
  throttleTime: 1000,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // 24h
});

// -----------------------------
// 5) TanstackQueryProvider
// -----------------------------
export const TanstackQueryProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
