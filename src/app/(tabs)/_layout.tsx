import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: {
          backgroundColor: '#141414',
          borderTopColor: '#262626',
        },
        headerStyle: {
          backgroundColor: '#141414',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Yêu thích',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "heart" : "heart-outline"} color={color} />
          ),
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
