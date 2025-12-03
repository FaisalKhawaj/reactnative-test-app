import { HomeIcon } from '@/assets/icons';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fonts } from '@/hooks/useCacheResource';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TAB_BASE_HEIGHT = 60;


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets(); // 👈 bottom inset for Android/iOS

  const tabBarHeight =
    Platform.OS === "ios" ? TAB_BASE_HEIGHT : TAB_BASE_HEIGHT + insets.bottom; // 👈 give it extra height
  const tabPaddingBottom = insets.bottom > 0 ? insets.bottom * 0.6 : 6;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarActiveTintColor:'red',
        // tabBarInactiveTintColor: "#9EA4B0",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          elevation: 0,
          height: tabBarHeight,
          backgroundColor:'#2E2739',
          borderRadius:40,
          paddingBottom: tabPaddingBottom, // push content above back button in android on real device
          paddingTop: 0,
        },
        tabBarItemStyle: {
          height: TAB_BASE_HEIGHT,
          justifyContent: "center",
          alignItems: "center",

        },
        headerTitleStyle:{
          fontSize:10,
          color:'red',
          fontFamily:fonts.poppins.regular,
        },
      
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon  color={color} />,
        }}
      />

<Tabs.Screen
        name="watch"
        options={{
          title: 'Watch',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />

    
    </Tabs>
  );
}
