import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoriteContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Product } from '@/types/product';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    // const [isFavorite, setIsFavorite] = useState(false);
    const {addItem} = useCart();
    const {addFavorite,isFavorite,removeFavorite} = useFavorites();

    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const tint = useThemeColor({},"tint");
    const cardBackgroundColor = backgroundColor === '#fff' ? '#f8f9fa' : '#1f2937';

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setProduct(data);
        } catch (err) {
            Alert.alert('Error', 'Failed to load product details. Please try again.');
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        // Alert.alert('Added to Cart', `${product?.title} has been added to your cart!`);
        // TODO: Implement actual cart logic
        product && addItem(product);
    };

    const handleToggleFavorite = () => {
        // setIsFavorite(!isFavorite);
        // Alert.alert(
        //     isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
        //     `${product?.title} has been ${isFavorite ? 'removed from' : 'added to'} your favorites!`
        // );
        // TODO: Implement actual favorites logic
        // product && addFavorite(product);
        product && isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor }]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={textColor} />
                    <Text style={[styles.loadingText, { color: textColor }]}>Loading product...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor }]}>
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: textColor }]}>Product not found</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={[styles.backButtonText, { color: textColor }]}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: cardBackgroundColor }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
                    <Ionicons name="arrow-back" size={24} color={textColor} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: textColor }]} numberOfLines={1}>
                    Product Details
                </Text>
                <TouchableOpacity onPress={handleToggleFavorite} style={styles.headerButton}>
                    <Ionicons 
                        name={isFavorite(product.id) ? "heart" : "heart-outline"} 
                        size={24} 
                        color={isFavorite(product.id) ? "#ff6b6b" : textColor} 
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Image Gallery */}
                <View style={styles.imageGalleryContainer}>
                    <Image
                        source={{ uri: product.images[selectedImage] || 'https://placehold.co/600x400' }}
                        style={styles.mainImage}
                        resizeMode="cover"
                    />
                    {product.images.length > 1 && (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.thumbnailContainer}
                            contentContainerStyle={styles.thumbnailContent}
                        >
                            {product.images.map((image, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setSelectedImage(index)}
                                    style={[
                                        styles.thumbnail,
                                        selectedImage === index && styles.thumbnailSelected &&{borderColor:tint},
                                    ]}
                                >
                                    <Image
                                        source={{ uri: image || 'https://placehold.co/600x400' }}
                                        style={styles.thumbnailImage}
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                {/* Product Info */}
                <View style={[styles.infoContainer, { backgroundColor: cardBackgroundColor }]}>
                    <View style={[styles.categoryBadge,{backgroundColor:tint}]}>
                        <Text style={styles.categoryText}>{product.category.name}</Text>
                    </View>
                    
                    <Text style={[styles.title, { color: textColor }]}>{product.title}</Text>
                    
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={18} color="#ffd700" />
                            <Text style={[styles.rating, { color: textColor }]}>4.5</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={[styles.sectionTitle, { color: textColor }]}>Description</Text>
                    <Text style={[styles.description, { color: textColor }]}>
                        {product.description}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={[styles.sectionTitle, { color: textColor }]}>Product Details</Text>
                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, { color: textColor, opacity: 0.7 }]}>
                                Product ID
                            </Text>
                            <Text style={[styles.detailValue, { color: textColor }]}>
                                #{product.id}
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, { color: textColor, opacity: 0.7 }]}>
                                Category
                            </Text>
                            <Text style={[styles.detailValue, { color: textColor }]}>
                                {product.category.name}
                            </Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={[styles.detailLabel, { color: textColor, opacity: 0.7 }]}>
                                Availability
                            </Text>
                            <Text style={[styles.detailValue, { color: '#2ecc71' }]}>
                                In Stock
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Spacer for bottom button */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Action Button */}
            <View style={[styles.bottomContainer, { backgroundColor: cardBackgroundColor }]}>
                <TouchableOpacity style={[styles.addToCartButton,{backgroundColor:tint}]} onPress={handleAddToCart}>
                    <Ionicons name="cart" size={24} color="#fff" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: 70,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
    },
    imageGalleryContainer: {
        backgroundColor: '#fff',
    },
    mainImage: {
        width: width,
        height: width,
    },
    thumbnailContainer: {
        paddingVertical: 12,
    },
    thumbnailContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'transparent',
        overflow: 'hidden',
        marginRight: 8,
    },
    thumbnailSelected: {
        borderColor: '#4ecdc4',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
    },
    categoryBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#4ecdc4',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 12,
    },
    categoryText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        lineHeight: 32,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2ecc71',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        opacity: 0.8,
    },
    detailsGrid: {
        gap: 16,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 14,
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    addToCartButton: {
        // backgroundColor: '#4ecdc4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 20,
    },
    backButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
