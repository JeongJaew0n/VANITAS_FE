import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/client';

export function useToggleWishlistMutation() {
  return useMutation({
    mutationFn: async (productId: number) => {
      await apiClient.post(`/api/wishlist/${productId}`);
    },
  });
}
