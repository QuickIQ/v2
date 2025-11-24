import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import { env } from '../../infrastructure/config/env';

/**
 * Stripe Webhook Middleware
 * Verifies webhook signature and extracts event
 */
export const stripeWebhookMiddleware = () => {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' as any,
  });

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const sig = req.headers['stripe-signature'] as string;

    if (!sig || !env.STRIPE_WEBHOOK_SECRET) {
      res.status(400).json({ error: 'Missing signature or webhook secret' });
      return;
    }

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        env.STRIPE_WEBHOOK_SECRET
      );

      // Attach event to request for controller
      (req as any).stripeEvent = event;
      next();
    } catch (error: any) {
      console.error('Webhook signature verification failed:', error.message);
      res.status(400).json({ error: `Webhook Error: ${error.message}` });
    }
  };
};

