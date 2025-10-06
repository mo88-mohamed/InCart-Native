
import ProductList from '@/components/ProductList';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Product } from '@/types/product';
import { checkIsRTL } from '@/utils/i18n';
import { FontAwesome } from '@expo/vector-icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { goBack } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function search() {
    const tint = useThemeColor({}, "tint");
    const textColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background");
    const borderColor = useThemeColor({}, "icon");

    const [query, setQuery] = useState<string>("");
    const [allProducts, setAllProducts] = useState<Product[]|undefined>(undefined);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery ] = useState<string>("");
    const {t} = useTranslation();
    const isRTL = checkIsRTL();
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000 * 5, // 5 minutes

        },
      },
    });

    const fetchAllProducts = async () => {
        if (!query || query.trim().length === 0) return;

        setLoading(true);
        try {
            setSearchQuery(query.trim());
        } catch (err) {
            // Alert.alert('Error', 'Failed to search products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return(
      <QueryClientProvider client={queryClient}>
        <View style={[styles.container,{backgroundColor:backgroundColor}]}>

    <View style={[styles.searchContainer, { borderColor }]}>
      <FontAwesome name={isRTL?'angle-right':'angle-left'} size={30} color={tint} onPress={goBack}  />

      <TextInput
        style={[styles.searchInput, { color: textColor }]}
        placeholder={t('search')}
        placeholderTextColor={textColor + '80'}
        value={query}
        onChangeText={setQuery}
        returnKeyType='send'
        onSubmitEditing={fetchAllProducts}
      />
      <TouchableOpacity onPress={fetchAllProducts} style={styles.searchButton}>
        <FontAwesome name='search' size={20} color={tint} />
      </TouchableOpacity>
      {query.length > 0 && (
        <TouchableOpacity onPress={() => { setQuery(''); setSearchQuery(''); }} style={styles.clearButton}>
          <FontAwesome name='times' size={20} color={tint} />
        </TouchableOpacity>
      )}

    </View>

    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={tint} />
        <Text style={[styles.loadingText, { color: textColor }]}>
          {t('searching')}
        </Text>
      </View>
    ) : (
      <ProductList
        type="search"
        query={searchQuery}
        onProductPress={(product) => {
          console.log('Selected product:', product.title);
        }}
      />
    )}

    </View>
      </QueryClientProvider>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 10,
        marginTop: 50,
        gap: 10,
    },
    searchContainer: {
        padding: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15,
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin:10
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 5,
    },
    searchicon: {
        flex: 0
    },
    searchButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
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
});