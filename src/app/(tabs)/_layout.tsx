import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

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
        name="trending"
        options={{
          title: 'Thịnh hành',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "trending-up" : "trending-up-outline"} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Yêu thích',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={24} name={focused ? "heart" : "heart-outline"} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
