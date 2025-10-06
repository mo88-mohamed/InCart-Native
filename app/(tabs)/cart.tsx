import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTranslation } from 'react-i18next';
import { CartItem } from '@/types/cart';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock data for cart items
const CART_ITEMS = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://via.placeholder.com/100',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://via.placeholder.com/100',
    quantity: 2,
  },
];

export default function CartScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const {addItem,clearCart,getCartItemsCount,getCartTotal,items,removeItem,updateItemQuantity} = useCart();
  // const [items, setItems] = useState(CART_ITEMS);
  const router = useRouter();
  const { t } = useTranslation();
  const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
  const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;
  const cardBackground = colorScheme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  // const updateQuantity = (id: string, newQuantity: number) => {
  //   if (newQuantity < 1) return;
  //   setItems(items.map(item => 
  //     item.id === id ? { ...item, quantity: newQuantity } : item
  //   ));
  // };

  // const removeItem = (id: string) => {
  //   setItems(items.filter(item => item.id !== id));
  // };

  // const calculateTotal = () => {
  //   return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  // };

  const renderItem = ({ item }: { item: CartItem }) => (
    <TouchableOpacity onPress={() => router.navigate(`/product/${item.id}`)}>
    <View style={[styles.itemContainer, { backgroundColor: cardBackground }]}>
      <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, { color: textColor }]}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
          >
            <FontAwesome name="minus" size={16} color={tintColor} />
          </TouchableOpacity>
          
          <TextInput
            style={[styles.quantityInput, { color: textColor }]}
            value={item.quantity.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const num = parseInt(text) || 1;
              updateItemQuantity(item.id, num);
            }}
          />
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            <FontAwesome name="plus" size={16} color={tintColor} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <FontAwesome name="trash" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{t('shoppingCart')}</Text>
        <Text style={styles.subtitle}>{t('itemsCount', { count: items.length })}</Text>
      </View>
      
      {items.length > 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 70 }}
          />
          
          <View style={[styles.summaryContainer, { backgroundColor: cardBackground }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, { color: textColor }]}>{t('subtotal')}</Text>
              <Text style={[styles.summaryAmount, { color: textColor }]}>${getCartTotal().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryText, { color: textColor }]}>{t('shipping')}</Text>
              <Text style={[styles.summaryAmount, { color: textColor }]}>$0.00</Text>
            </View>
            <View style={styles.divider} />
            <View style={[styles.summaryRow, { marginBottom: 0 }]}>
              <Text style={[styles.totalText, { color: textColor }]}>{t('total')}</Text>
              <Text style={[styles.totalAmount, { color: tintColor }]}>${getCartTotal().toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={[styles.checkoutButton, { backgroundColor: tintColor }]}
              activeOpacity={0.8}
            >
              <Text style={styles.checkoutButtonText}>{t('proceedToCheckout')}</Text>
              <IconSymbol name="arrow.right" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <IconSymbol name="cart" size={64} color={Colors[colorScheme ?? 'light'].tabIconDefault} />
          <Text style={[styles.emptyText, { color: textColor }]}>{t('emptyCart')}</Text>
          <Text style={[styles.emptySubtext, { color: textColor }]}>
            {t('emptyCartMessage')}
          </Text>
          {/* <TouchableOpacity 
            style={[styles.continueButton, { borderColor: tintColor }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.continueButtonText, { color: tintColor }]}>
              Continue Shopping
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    // marginBottom:50
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
    paddingBottom: 180, // To make space for the summary container
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    margin:10,
    marginBottom: 3,
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
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E5E5E5',
  },
  quantityInput: {
    width: 40,
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 8,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 16,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
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
    marginBottom: 24,
  },
  continueButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
