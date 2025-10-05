import { StyleSheet } from 'react-native';

import ProductList from '@/components/ProductList';
import { ThemedView } from '@/components/themed-view';
import Top from '@/components/Top';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Product } from '@/types/product';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const bgColor = useThemeColor({},"background");
  const router = useRouter();

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5, // 5 minutes
        
      },
    },
  });
  return (
    <ThemedView style={styles.container}>
      <Top/>
      <QueryClientProvider client={queryClient}>
      <ProductList onProductPress={handleProductPress} />
      </QueryClientProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
