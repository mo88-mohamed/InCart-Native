import { useThemeColor } from '@/hooks/use-theme-color';
import { Product, ProductListProps } from '@/types/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ThemedView } from './themed-view';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

const ProductList = ({ onProductPress, query, type }: ProductListProps) => {
  // Remove local loading and error states since useInfiniteQuery handles them

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'icon'); // Using icon color as border color
  const cardBackgroundColor = backgroundColor === '#fff' ? '#f8f9fa' : '#1f2937'; // Light/dark card background

  // Construct the base URL for API calls
  const getBaseUrl = () => {
    if (type === 'search' && query) {
      return `${API_URL}?title=${encodeURIComponent(query)}`;
    }
    return API_URL;
  };

  const {data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isLoading,
    error: queryError} = useInfiniteQuery({
      queryKey: [type === 'search' ? 'search' : 'products', query].filter(Boolean),
      initialPageParam:1,
      queryFn: async ({ pageParam = 1 }) => {
        const offset = (pageParam - 1) * 10;
        const baseUrl = getBaseUrl();
        const separator = baseUrl.includes('?') ? '&' : '?';
        const url = `${baseUrl}${separator}offset=${offset}&limit=10`;
        console.log(url);
        const response = await fetch(url);
        return response.json();
      },
      getNextPageParam : (lastPage, allPages, lastPageParam) => {
        // For offset-based pagination, check if we got a full page
        // If the last page has fewer than 10 items, we've reached the end
        if (lastPage && lastPage.length < 10) {
          return undefined; // No more pages
        }
        return (lastPageParam || 1) + 1; // Next page number
      },
      // enabled: type !== 'search' || !query, // Only run query if not search or if query exists
    })
    const products = useMemo(() => data?.pages.flatMap(page => page), [data]);
  //     setLoading(true);
  //     const response = await fetch(apiUrl || API_URL);
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
      
  //     const data = await response.json();
  //     setProducts(data);
  //     setError(null);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch products');
  //     Alert.alert('Error', 'Failed to load products. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(apiUrl || API_URL);
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
      
  //     const data = await response.json();
  //     setProducts(data);
  //     setError(null);
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Failed to fetch products');
  //     Alert.alert('Error', 'Failed to load products. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
    console.log(products);
  useEffect(() => {
    // No need for manual effect since useInfiniteQuery handles everything
    // The query will automatically refetch when query or type changes
  }, [query, type]);


  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: cardBackgroundColor, borderColor }]}
      onPress={() => onProductPress?.(item)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item?.images?.length ? item?.images[0] : 'https://placehold.co/600x400' }} 
        style={styles.productImage} 
      />
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle, { color: textColor }]} numberOfLines={2}>
          {item?.title}
        </Text>
        <Text style={[styles.productCategory, { color: textColor, opacity: 0.7 }]}>
          {item?.category?.name}
        </Text>
        <Text style={[styles.productPrice, { color: textColor }]}>
          ${item?.price?.toFixed(2)}
        </Text>
        <Text style={[styles.productDescription, { color: textColor, opacity: 0.8 }]} numberOfLines={2}>
          {item?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading || isRefetching) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={textColor} />
        <Text style={[styles.loadingText, { color: textColor }]}>Loading products...</Text>
      </ThemedView>
    );
  }

  if (queryError) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: textColor }]}>
          {queryError?.message || 'An error occurred'}
        </Text>
        <TouchableOpacity
          style={[styles.retryButton, { borderColor }]}
          onPress={() => refetch()}
        >
          <Text style={[styles.retryButtonText, { color: textColor }]}>
            Retry
          </Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Text style={[styles.header, { color: textColor }]}>
        Products ({products?.length})
      </Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage && hasNextPage ?
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={textColor} />
            <Text style={[styles.loadingText, { color: textColor }]}>Loading products...</Text>
          </ThemedView>
        : null}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // marginBottom:50
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    // justifyContent: 'space-between',
    alignItems:"flex-start",
    justifyContent:"flex-start"
  },
  productCard: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    // borderWidth: 1,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 18,
  },
  productCategory: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2ecc71',
  },
  productDescription: {
    fontSize: 11,
    lineHeight: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductList;
