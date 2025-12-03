// this is generic hook for fonts and splash screen

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export const fontAssets = [
  {
    poppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
  },
  {
    poppinsBlackItalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
  },
  {
    poppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  },
  {
    poppinsSemibold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  },
  {
    poppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
  },
  {
    poppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
  },
  {
    poppinsMediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
  },
  {
    poppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  },
 
 
].map((x: any) => Font.loadAsync(x));

export const fonts = {
  poppins: {
    black: "poppinsBlack",
    blackItalic: "poppinsBlackItalic",
    bold: "poppinsBold",
    semibold: "poppinsSemibold",
    boldItalic: "poppinsBoldItalic",
    medium: "poppinsMedium",
    interMediumItalic: "poppinsMediumItalic",
    interRegular: "poppinsRegular",
    interSemibold: "poppinsSemibold",
    mediumItalic: "poppinsMediumItalic",
    regular: "poppinsRegular",
  },

};

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  async function loadResourcesAndDataAsync() {
    try {
      SplashScreen.preventAutoHideAsync();
      // Load fonts

      // await Font.loadAsync(fontAssets);
      await Promise.all([...fontAssets]);
    } catch (e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    } finally {
      setLoadingComplete(true);
      //  setTimeout(SplashScreen.hideAsync, 10000);
      SplashScreen.hideAsync();
    }
  }
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete, setLoadingComplete };
}
