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
import { SafeAreaProvider } from "react-native-safe-area-context";

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
      {/* <QueryClientProvider client={queryClient}> */}
      <FavoriteProvider>
        <CartProvider>
            {/* <SafeAreaView/> */}
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
              <Stack.Screen
                name="product/[id]"
                options={{ headerShown: false }}
              />
              {/* <Stack.Screen name="search"  options={{headerShown:false,header:SearchInput}} /> */}
            </Stack>
        </CartProvider>
      </FavoriteProvider>
      {/* </QueryClientProvider> */}
      </SafeAreaProvider>

    </ThemeProvider>
  );
}
