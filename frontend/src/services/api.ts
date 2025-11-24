/**
 * @deprecated Use features/tests/api/testApi and features/payments/api/paymentApi instead
 * This file is kept for backward compatibility during migration
 */
import { testApi } from '../features/tests';
import { paymentApi } from '../features/payments';

// Re-export for backward compatibility
export { testApi, paymentApi };

// Legacy translation API (if still needed)
import apiClient from '../lib/apiClient';

export const translationApi = {
  getTranslations: async (language: string): Promise<Record<string, string>> => {
    const response = await apiClient.get(`/translations/${language}`);
    return response.data;
  },
};

export default apiClient;

