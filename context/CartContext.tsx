import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { CartContextType, CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = 'user_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Failed to load cart from storage', error);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Failed to save cart to storage', error);
      }
    };
    saveCart();
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === productId ? { ...item, quantity } : item)).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
