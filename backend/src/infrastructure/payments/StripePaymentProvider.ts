import Stripe from 'stripe';
import { IPaymentProvider, CreatePaymentIntentRequest, CreatePaymentIntentResponse } from '../../application/ports/IPaymentProvider';

/**
 * Stripe Implementation of IPaymentProvider
 */
export class StripePaymentProvider implements IPaymentProvider {
  private stripe: Stripe;

  constructor(secretKey: string, apiVersion: string = '2023-10-16') {
    if (!secretKey) {
      throw new Error('Stripe secret key is required');
    }
    this.stripe = new Stripe(secretKey, { apiVersion: apiVersion as any });
  }

  async createPaymentIntent(request: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: request.amount.getCents(),
      currency: request.currency,
      metadata: request.metadata,
    });

    if (!paymentIntent.client_secret) {
      throw new Error('Failed to create payment intent');
    }

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  verifyWebhookSignature(payload: string | Buffer, signature: string): boolean {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      return false;
    }

    try {
      this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  extractPaymentIntentFromEvent(event: any): { paymentIntentId: string; metadata: Record<string, string> } {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    return {
      paymentIntentId: paymentIntent.id,
      metadata: paymentIntent.metadata as Record<string, string>,
    };
  }
}

