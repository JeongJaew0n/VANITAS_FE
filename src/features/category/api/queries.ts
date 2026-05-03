import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/client';
import type { Category } from '@/shared/types/api';

export const categoryKeys = {
  all: ['categories'] as const,
};

export function useCategoriesQuery() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: async () => {
      const { data } = await apiClient.get<Category[]>('/api/categories');
      return data;
    },
  });
}
