import { Product } from "./product";

export interface FavoriteContextType {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoritesCount: () => number;
}
