import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useFavorites } from '@/context/FavoriteContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types/product';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock data for favorites
// const FAVORITE_ITEMS = [
//   {
//     id: '1',
//     name: 'Wireless Headphones',
//     price: 99.99,
//     image: 'https://via.placeholder.com/100',
//     rating: 4.5,
//   },
//   {
//     id: '2',
//     name: 'Smart Watch',
//     price: 199.99,
//     image: 'https://via.placeholder.com/100',
//     rating: 4.2,
//   },
//   {
//     id: '3',
//     name: 'Bluetooth Speaker',
//     price: 79.99,
//     image: 'https://via.placeholder.com/100',
//     rating: 4.7,
//   },
// ];

export default function FavoritesScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const cardBackground = colorScheme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const {favorites} = useFavorites();
  const { t } = useTranslation();

  const renderItem = ({ item }: { item: Product }) => (
    <View style={[styles.itemContainer, { backgroundColor: cardBackground }]}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: textColor }]}>{item.title}</Text>
        {/* <View style={styles.ratingContainer}>
          <IconSymbol name="star.fill" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{4.5}</Text>
        </View> */}
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="cart.badge.plus" size={24} color={Colors[colorScheme ?? 'light'].tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="trash" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{t('myFavorites')}</Text>
        <Text style={styles.subtitle}>{t('itemsCount', { count: favorites.length })}</Text>
      </View>
      
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <IconSymbol name="heart.slash" size={64} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
          <Text style={[styles.emptyText, { color: textColor }]}>{t('noFavoritesYet')}</Text>
          <Text style={[styles.emptySubtext, { color: textColor }]}>
            {t('addToFavoritesInstruction')}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  listContent: {
    paddingBottom: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#888',
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  itemActions: {
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  actionButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});
