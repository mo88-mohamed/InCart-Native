import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { CartProvider } from "@/context/CartContext";
import { FavoriteProvider } from "@/context/FavoriteContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";
import '../utils/i18n';
import i18n from "../utils/i18n";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 60 * 1000 * 5, // 5 minutes
        
  //     },
  //   },
  // });

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <SafeAreaProvider>

      <StatusBar style="dark" />
      <I18nextProvider i18n={i18n}>
        <FavoriteProvider>
          <CartProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                  name="modal"
                  options={{ presentation: "modal", title: "Modal" }}
                />
              </Stack>
          </CartProvider>
        </FavoriteProvider>
      </I18nextProvider>
      </SafeAreaProvider>

    </ThemeProvider>
  );
}
