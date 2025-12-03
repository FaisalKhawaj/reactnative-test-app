import { HomeIcon } from '@/assets/icons';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { fonts } from '@/hooks/useCacheResource';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
          height: 60,
          backgroundColor:'#2E2739',
          borderRadius:40,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 3,
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
