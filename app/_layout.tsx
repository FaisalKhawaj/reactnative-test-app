import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { TanstackQueryProvider } from '@/context/TanstackQueryProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import useCachedResources from '@/hooks/useCacheResource';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const colorScheme = useColorScheme();
const {isLoadingComplete}=useCachedResources();

useEffect(() => {
  if (isLoadingComplete) {
    SplashScreen.hideAsync();
  }
}, [isLoadingComplete]);
if (!isLoadingComplete) {
  // Async font loading only occurs in development.
  return null;
}

  return (
    <TanstackQueryProvider>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movie-detail" options={{ headerShown: false }} />
        <Stack.Screen name="tickets" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </TanstackQueryProvider>
  );
}
