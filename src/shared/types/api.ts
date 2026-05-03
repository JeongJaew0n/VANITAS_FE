export interface Page<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface Product {
  id: number;
  slug: string;
  brand: string;
  name: string;
  category: string;
  tag: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  discountRate: number;
  shippingLabel: string;
  rarity: number;
  icon: ProductIconName;
  dark?: boolean;
}

export type ProductIconName =
  | 'headphones'
  | 'shoe'
  | 'watch'
  | 'coffee'
  | 'laptop'
  | 'perfume'
  | 'chair'
  | 'camera';

export interface Category {
  id: number;
  slug: string;
  name: string;
  count: number;
  icon: CategoryIconName;
}

export type CategoryIconName =
  | 'digital'
  | 'fashion'
  | 'beauty'
  | 'living'
  | 'food'
  | 'kids'
  | 'sport'
  | 'books';

export interface FlashDeal {
  id: number;
  title: string;
  subtitle: string;
  refreshesAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ProductFilters {
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
}
