import express from 'express';
import Stripe from 'stripe';
import { pool } from '../db/connection';

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Create payment intent
router.post('/create-intent', async (req, res, next) => {
  try {
    const { testSlug, sessionId, amount } = req.body;

    // Verify test exists and is premium
    const testResult = await pool.query(
      'SELECT * FROM tests WHERE slug = $1',
      [testSlug]
    );

    if (testResult.rows.length === 0) {
      return res.status(404).json({ error: 'Test not found' });
    }

    const test = testResult.rows[0];

    if (!test.is_premium) {
      return res.status(400).json({ error: 'Test is not premium' });
    }

    const paymentAmount = amount || test.price_cents; // Amount in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount,
      currency: 'usd',
      metadata: {
        testSlug,
        sessionId,
      },
    });

    // Update session with payment intent
    if (sessionId) {
      await pool.query(
        'UPDATE test_sessions SET payment_intent_id = $1 WHERE id = $2',
        [paymentIntent.id, sessionId]
      );
    }

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    next(error);
  }
});

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(400).send('Missing signature');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { sessionId } = paymentIntent.metadata;

    if (sessionId) {
      await pool.query(
        'UPDATE test_sessions SET paid = true WHERE id = $1',
        [sessionId]
      );
    }
  }

  res.json({ received: true });
});

// Verify payment status
router.get('/status/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const result = await pool.query(
      'SELECT paid, payment_intent_id FROM test_sessions WHERE id = $1',
      [sessionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ paid: result.rows[0].paid });
  } catch (error) {
    next(error);
  }
});

export default router;

