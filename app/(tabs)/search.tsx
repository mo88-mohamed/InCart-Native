
import ProductList from '@/components/ProductList';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Product } from '@/types/product';
import { FontAwesome } from '@expo/vector-icons';
import { goBack } from 'expo-router/build/global-state/routing';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, View } from 'react-native';




export default function search() {
    const tint = useThemeColor({}, "tint");
    const textColor = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background");
    const borderColor = useThemeColor({}, "icon");
    
    const [query, setQuery] = useState<string>("");
    const [allProducts, setAllProducts] = useState<Product[]|undefined>(undefined);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);


    const fetchAllProducts = async () => {
        if (query && query.length===0) return
        try {

            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${query}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setAllProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            Alert.alert('Error', 'Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };
  return (
    <View style={[styles.container,{backgroundColor:backgroundColor}]}>

    <View style={[styles.searchContainer, { borderColor }]}>
      <FontAwesome name='angle-left' size={30} color={tint} onPress={goBack}  />

      <TextInput 
        style={[styles.searchInput, { color: textColor }]} 
        placeholder='Search products...' 
        placeholderTextColor={textColor + '80'}
        value={query} 
        onChangeText={setQuery}
        returnKeyType='send'
        onSubmitEditing={fetchAllProducts}
      />
      <FontAwesome style={[styles.searchicon]} name='search' size={24} color={tint} />

    </View>
    
    {loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={tint} />
        <Text style={[styles.loadingText, { color: textColor }]}>
          Loading products...
        </Text>
      </View>
    ) : (
      <ProductList 
        products={allProducts} 
        onProductPress={(product) => {
          console.log('Selected product:', product.title);
        }}
      />
    )}

    </View>
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