import "dotenv/config"; // optional: lets you use a local .env when running locally

// Decide which "environment" this build is
const APP_ENV = process.env.APP_ENV ?? process.env.ENV ?? "development";

export default ({ config }) => {
  console.log("app.config.js APP_ENV:", APP_ENV);
  console.log("env.api-ur", process.env.API_URL);
  return {
    // This `config` comes from app.json, we keep it
    ...config,

    // (Optional) you can still override things here if needed:
    name: "test-app",
    slug: "test-app",

    // const bundleIdentifier = {
    //     local: "com.react-native-test.app.faisal",
    //     development: "com.ggs.app.faisal",
    //     staging: "com.ggs.faisal",
    //     production: "com.app.faisal",
    //   };
    //   const bundleIdentifier = bundleIdentifier[environment];

    // we can also give different names to app in different enviroments
    // name: {
    //     local: "TEST-Dev",
    //     development: "TEST-Dev",
    //     staging: "TEST-Stg",
    //     production: "TEST",
    //   }[environment],

    // we can also keep plugins ,web,android, ios here as well
    extra: {
      // keep anything already defined in app.json -> expo.extra
      ...(config.extra ?? {}),

      // keep router + eas exactly as you have them
      router: {
        ...(config.extra?.router ?? {}),
      },
      eas: {
        ...(config.extra?.eas ?? {}),
      },

      // ✅ your environment variables from Expo / EAS
      API_URL: process.env.EXPO_PUBLIC_API_URL, // set per-profile (dashboard or `eas.json`)
      ENV: process.env.ENV, // raw value if you still want it
      APP_ENV, // normalized: "development" | "preview" | "production"
    },
  };
};
