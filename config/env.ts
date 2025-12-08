
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const API_URL = extra.API_URL as string | undefined;
export const ENV = extra.ENV as string | undefined;
export const APP_ENV = extra.APP_ENV as string | undefined;
