import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Product } from '@/shared/types/api';

export interface LocalCartItem {
  productId: number;
  quantity: number;
  product: Product;
}

interface CartState {
  items: LocalCartItem[];
  add: (product: Product, quantity?: number) => void;
  remove: (productId: number) => void;
  updateQty: (productId: number, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          return { items: [...state.items, { productId: product.id, quantity, product }] };
        }),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((item) => item.productId !== productId) })),
      updateQty: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) =>
                  item.productId === productId ? { ...item, quantity } : item,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'maru-cart-v1',
      version: 1,
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state: CartState) =>
  state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
