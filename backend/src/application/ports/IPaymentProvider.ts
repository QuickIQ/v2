import { Money } from '../../domain/value-objects/Money';

export interface CreatePaymentIntentRequest {
  amount: Money;
  currency: string;
  metadata: Record<string, string>;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

/**
 * Payment Provider Port
 * Abstraction for payment processing (Stripe, PayPal, etc.)
 */
export interface IPaymentProvider {
  createPaymentIntent(request: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse>;
  verifyWebhookSignature(payload: string | Buffer, signature: string): boolean;
  extractPaymentIntentFromEvent(event: any): { paymentIntentId: string; metadata: Record<string, string> };
}

