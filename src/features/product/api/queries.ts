import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/client';
import type { Page, Product, ProductFilters } from '@/shared/types/api';
import { productKeys } from '@/features/product/api/keys';

export function useBestProductsQuery(limit = 8) {
  return useQuery({
    queryKey: productKeys.best(limit),
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>('/api/products/best', { params: { limit } });
      return data;
    },
  });
}

export function useProductsQuery(filters: ProductFilters) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async () => {
      const { data } = await apiClient.get<Page<Product>>('/api/products', { params: filters });
      return data;
    },
  });
}
