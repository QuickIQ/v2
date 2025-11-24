import apiClient from '../../../lib/apiClient';

/**
 * Payment API Types
 */
export interface CreatePaymentIntentRequest {
  testSlug: string;
  sessionId: number;
  amount?: number; // in cents
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface PaymentStatusResponse {
  paid: boolean;
  paymentStatus?: 'not_required' | 'pending' | 'paid' | 'failed';
}

/**
 * Payment API Client
 * Handles all payment-related API calls
 */
export const paymentApi = {
  /**
   * Create a payment intent for a premium test
   */
  createIntent: async (
    request: CreatePaymentIntentRequest
  ): Promise<CreatePaymentIntentResponse> => {
    const response = await apiClient.post('/payments/create-intent', request);
    return response.data;
  },

  /**
   * Check payment status for a session
   */
  checkStatus: async (sessionId: number): Promise<PaymentStatusResponse> => {
    const response = await apiClient.get(`/payments/status/${sessionId}`);
    return response.data;
  },
};

