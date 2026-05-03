import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/client';
import type { CartItem } from '@/shared/types/api';

export const cartKeys = {
  all: ['cart'] as const,
};

export function useAddToCartMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: number; quantity?: number }) => {
      const { data } = await apiClient.post<CartItem>('/api/cart', { productId, quantity });
      return data;
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
  });
}
