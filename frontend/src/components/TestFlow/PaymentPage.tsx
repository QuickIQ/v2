import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { paymentApi } from '../../services/api';
import { Test } from '../../types';
import '../../App.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
  testName: string;
  onSuccess: () => void;
}

function PaymentForm({ clientSecret, amount, testName, onSuccess }: PaymentFormProps) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || t('test.payment.error'));
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message || t('test.payment.error'));
    } else {
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && <div className="error">{error}</div>}
      
      <div style={{ marginBottom: '24px' }}>
        <PaymentElement />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-large"
        disabled={!stripe || loading}
        style={{ width: '100%' }}
      >
        {loading ? t('test.payment.processing') : t('test.payment.payButton', { amount: (amount / 100).toFixed(2) })}
      </button>
    </form>
  );
}

interface Props {
  test: Test;
  sessionId: number;
  onSuccess: () => void;
}

function PaymentPage({ test, sessionId, onSuccess }: Props) {
  const { t } = useTranslation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await paymentApi.createIntent(test.slug, sessionId, test.price_cents);
        setClientSecret(response.clientSecret);
      } catch (err: any) {
        setError(err.message || t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [test, sessionId, t]);

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  if (error || !clientSecret) {
    return (
      <div className="container" style={{ paddingTop: '40px' }}>
        <div className="error">{error || t('common.error')}</div>
      </div>
    );
  }

  const amount = test.price_cents;

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px', color: '#333' }}>
            {t('test.payment.title')}
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '8px', color: '#666' }}>
            {t('test.payment.subtitle', { testName: test.translated_name || test.name })}
          </p>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', marginBottom: '32px' }}>
            {t('test.payment.amount', { amount: (amount / 100).toFixed(2) })}
          </div>

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
              },
            }}
          >
            <PaymentForm
              clientSecret={clientSecret}
              amount={amount}
              testName={test.translated_name || test.name}
              onSuccess={onSuccess}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;

