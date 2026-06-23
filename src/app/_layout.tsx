import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../../global.css";

// Custom dark theme for Netflix branding
const NetflixTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#141414',
    card: '#141414',
    text: '#ffffff',
    border: '#262626',
    primary: '#E50914',
  },
};

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider value={NetflixTheme}>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#141414',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#141414',
        },
        headerBackButtonDisplayMode: 'minimal',
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: 'Tìm kiếm'}} />
        <Stack.Screen name="movie/[id]" options={{ title: 'Chi tiết phim' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
