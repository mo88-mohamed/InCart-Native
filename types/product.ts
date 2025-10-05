export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface ProductListProps {
  onProductPress?: (product: Product) => void;
  apiUrl?: string;
  products?: Product[];
}
