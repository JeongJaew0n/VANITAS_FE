import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/api/client';
import type { FlashDeal } from '@/shared/types/api';

export const dealKeys = {
  flash: ['deals', 'flash'] as const,
};

export function useFlashDealQuery() {
  return useQuery({
    queryKey: dealKeys.flash,
    queryFn: async () => {
      const { data } = await apiClient.get<FlashDeal>('/api/deals/flash');
      return data;
    },
  });
}
