import express from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { stripeWebhookMiddleware } from '../middlewares/stripeWebhook';

/**
 * Payment Routes
 * Defines HTTP endpoints for payment operations
 */
export const createPaymentRoutes = (
  controller: PaymentController
): express.Router => {
  const router = express.Router();

  router.post('/create-intent', controller.createPaymentIntent);
  router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    stripeWebhookMiddleware(),
    controller.handleWebhook
  );
  router.get('/status/:sessionId', controller.getPaymentStatus);

  return router;
};

