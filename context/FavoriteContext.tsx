import React, { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { FavoriteContextType } from '@/types/favorite';
import { Product } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = 'user_favorites';

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Failed to load favorites from storage', error);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to storage', error);
      }
    };
    saveFavorites();
  }, [favorites]);

  const addFavorite = (product: Product) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.find(fav => fav.id === product.id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (productId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== productId));
  };

  const isFavorite = (productId: number) => {
    return favorites.some(fav => fav.id === productId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavoritesCount,
  };

  return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};
