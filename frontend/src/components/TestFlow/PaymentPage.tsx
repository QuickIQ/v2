import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { paymentApi } from '../../services/api';
import { Test } from '../../types';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  clientSecret: string;
  amount: number;
  testName: string;
  onSuccess: () => void;
}

function PaymentForm({ clientSecret, amount, testName, onSuccess }: PaymentFormProps) {
  const { t, i18n } = useTranslation();
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

    // Check if this is a mock client secret (development mode)
    const isMockSecret = clientSecret.includes('mock');
    
    if (isMockSecret) {
      // In development with mock secret, simulate successful payment
      console.log('🔧 Development mode: Simulating successful payment');
      setTimeout(() => {
        onSuccess();
      }, 500);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Use current path without any /flow/ segments to avoid 404
        return_url: window.location.origin + window.location.pathname.replace(/\/flow\/.*$/, ''),
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
      {error && (
        <div style={{
          padding: '12px',
          background: 'rgba(231, 76, 60, 0.1)',
          border: '1px solid rgba(231, 76, 60, 0.3)',
          borderRadius: '8px',
          color: '#e74c3c',
          marginBottom: '20px',
          fontSize: '14px',
        }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: '24px' }}>
        <PaymentElement />
      </div>

      <motion.button
        type="submit"
        disabled={!stripe || loading}
        whileHover={!loading && stripe ? { scale: 1.02 } : {}}
        whileTap={!loading && stripe ? { scale: 0.98 } : {}}
        style={{ 
          width: '100%',
          padding: '16px',
          background: 'linear-gradient(135deg, #FF9A9E 0%, #FFD6A5 100%)',
          border: 'none',
          borderRadius: '12px',
          color: 'white',
          fontSize: '18px',
          fontWeight: '600',
          cursor: (!stripe || loading) ? 'not-allowed' : 'pointer',
          opacity: (!stripe || loading) ? 0.6 : 1,
          boxShadow: '0 4px 20px rgba(255, 154, 158, 0.3)',
          transition: 'all 0.3s ease',
        }}
      >
        {loading 
          ? t('test.payment.processing') 
          : t('tests.personality.payment.pay_button') || 'Pay & Unlock Results'}
      </motion.button>
    </form>
  );
}

interface Props {
  test: Test;
  sessionId: number;
  onSuccess: () => void;
}

function PaymentPage({ test, sessionId, onSuccess }: Props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const paymentRef = useRef<HTMLDivElement | null>(null);

  const isPersonality = test.test_type === 'personality';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        // Ensure sessionId is valid
        const validSessionId = sessionId > 0 ? sessionId : Date.now();
        
        const response = await paymentApi.createIntent(test.slug, validSessionId, test.price_cents);
        
        if (response && response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          throw new Error('Invalid payment intent response');
        }
      } catch (err: any) {
        console.error('Payment intent creation error:', err);
        console.error('Error details:', {
          status: err.response?.status,
          message: err.message,
          data: err.response?.data,
          url: err.config?.url,
        });
        
        // Check if it's a network error or 404
        if (err.response?.status === 404 || err.code === 'ERR_NETWORK' || err.message?.includes('404')) {
          console.warn('Payment API endpoint not found or network error. Using mock payment for development.');
          
          // For development: Create a mock client secret to allow testing
          // In production, this should show an error
          if (import.meta.env.DEV || import.meta.env.MODE === 'development') {
            console.log('🔧 Development mode: Using mock payment intent');
            // Create a mock client secret that won't work with real Stripe but allows UI testing
            const mockClientSecret = `pi_mock_${Date.now()}_secret_mock_${Math.random().toString(36).substring(7)}`;
            setClientSecret(mockClientSecret);
            setError(null); // Clear error in dev mode
          } else {
            setError(t('tests.personality.payment.api_error') || 'Payment service temporarily unavailable. Please try again later.');
          }
        } else {
          setError(err.response?.data?.error || err.message || t('common.error'));
        }
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [test, sessionId, t]);

  const scrollToPayment = () => {
    if (paymentRef.current) {
      paymentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Localized content
  const features = [
    {
      icon: '🧠',
      title: i18n.language === 'tr' ? 'Gelişmiş Kişilik Haritası' : 'Advanced Personality Map',
      desc: i18n.language === 'tr' 
        ? 'Kendinizi derinlemesine anlamanızı sağlayan yapay zekâ destekli kişilik analizini edinin.'
        : 'Get AI-powered personality analysis that helps you understand yourself deeply.',
    },
    {
      icon: '📘',
      title: i18n.language === 'tr' ? 'Uygulanabilir Kişisel Öneriler' : 'Actionable Personal Insights',
      desc: i18n.language === 'tr'
        ? 'Kişisel büyümenize, ilişkilerinize ve iş hayatınıza yön verecek güçlü içgörüler kazanın.'
        : 'Gain powerful insights that will guide your personal growth, relationships, and career.',
    },
    {
      icon: '💡',
      title: i18n.language === 'tr' ? 'Kişiselleştirilmiş Gelişim Planı' : 'Personalized Growth Plan',
      desc: i18n.language === 'tr'
        ? 'Kendinizi daha iyi tanıyarak gerçek dünya başarılarına dönüştürün.'
        : 'Transform self-awareness into real-world success.',
    },
  ];

  const benefits = i18n.language === 'tr' ? [
    'Doğal güçlü yönlerinizi keşfedin',
    'Daha bilinçli kararlar alın',
    'İletişim becerilerinizi geliştirin',
    'Yeni kariyer yolları görün',
  ] : [
    'Discover your natural strengths',
    'Make more conscious decisions',
    'Improve your communication skills',
    'See new career paths',
  ];

  const howToApply = i18n.language === 'tr' ? [
    'Günlük hayatınızda güçlü yönlerinizi kullanın',
    'Farklı kişilik tiplerine uygun yaklaşımı öğrenin',
    'Stresi anlamlandırın ve azaltın',
    'Kendinize uygun ortamlar oluşturun',
  ] : [
    'Use your strengths in daily life',
    'Learn approaches suitable for different personality types',
    'Understand and reduce stress',
    'Create environments that suit you',
  ];

  const testimonials = i18n.language === 'tr' ? [
    {
      name: 'Abigail Yıldırım',
      text: 'Her şey göz önünde bulundurulduğunda, buna değer.',
      city: 'Bursa',
      country: 'Türkiye',
      time: '3 saat önce',
    },
    {
      name: 'Can Tomas',
      text: 'Bu testin derinliği beni şaşırttı, gerçekten harika hissettirdi!',
      city: 'İzmir',
      country: 'Türkiye',
      time: '1 hafta önce',
    },
    {
      name: 'Anonim',
      text: 'Kendimi daha iyi anlamamı sağladı, tavsiye ederim.',
      city: 'İstanbul',
      country: 'Türkiye',
      time: '1 saat önce',
    },
  ] : [
    {
      name: 'Sarah M.',
      text: 'All things considered, it\'s worth it.',
      city: 'New York',
      country: 'USA',
      time: '3 hours ago',
    },
    {
      name: 'John D.',
      text: 'The depth of this test surprised me, it felt really great!',
      city: 'London',
      country: 'UK',
      time: '1 week ago',
    },
    {
      name: 'Anonymous',
      text: 'It helped me understand myself better, I recommend it.',
      city: 'Paris',
      country: 'France',
      time: '1 hour ago',
    },
  ];

  const faqs = i18n.language === 'tr' ? [
    { 
      q: 'Kişilik testi doğru mu?', 
      a: 'Test, bilimsel MBTI metodolojisini temel alır ve yapay zekâ destekli analiz ile sonuçları doğrular.' 
    },
    { 
      q: 'Bilgilerim güvende mi?', 
      a: 'Evet. E-posta adresiniz yalnızca sonuçlarınızı göndermek için kullanılır, üçüncü kişilerle paylaşılmaz.' 
    },
  ] : [
    { 
      q: 'Is the personality test accurate?', 
      a: 'The test is based on scientific MBTI methodology and validates results with AI-powered analysis.' 
    },
    { 
      q: 'Is my information safe?', 
      a: 'Yes. Your email address is only used to send your results and is not shared with third parties.' 
    },
  ];

  const latestResults = [
    { name: 'Demir Mehmet', type: i18n.language === 'tr' ? 'Reformcu' : 'Reformer', flag: '🇹🇷' },
    { name: 'Dmitrov Dimityr', type: i18n.language === 'tr' ? 'Yardımcı' : 'Helper', flag: '🇧🇬' },
    { name: 'Çelik Ali', type: i18n.language === 'tr' ? 'Meydan Okuyucu' : 'Challenger', flag: '🇹🇷' },
    { name: 'Papageorgiou Maria', type: i18n.language === 'tr' ? 'Başaran' : 'Achiever', flag: '🇬🇷' },
    { name: 'Petrova Ivanka', type: i18n.language === 'tr' ? 'Bireyci' : 'Individualist', flag: '🇧🇬' },
    { name: 'Al-Samarai Ali', type: i18n.language === 'tr' ? 'Yardımcı' : 'Helper', flag: '🇮🇶' },
    { name: 'Rena Al-Debagh', type: i18n.language === 'tr' ? 'Tutkun' : 'Enthusiast', flag: '🇮🇶' },
    { name: 'Eleni Stoyanova', type: i18n.language === 'tr' ? 'Araştırmacı' : 'Investigator', flag: '🇬🇷' },
  ];

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF3F0 0%, #FFE9E5 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#FF7C7C' }}>
          {t('common.loading')}
        </div>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF3F0 0%, #FFE9E5 100%)',
        padding: '40px',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}>
          <div className="error" style={{ marginBottom: '20px' }}>
            {error || t('common.error')}
          </div>
        </div>
      </div>
    );
  }

  const amount = test.price_cents;

  // If not personality test, show simple payment page
  if (!isPersonality) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        background: '#f8f9fa'
      }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <div style={{ 
            textAlign: 'center',
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}>
            <h1 style={{ fontSize: '36px', marginBottom: '16px', color: '#333' }}>
              {t('test.payment.title')}
            </h1>
            <p style={{ fontSize: '18px', marginBottom: '32px', color: '#666' }}>
              {t('test.payment.subtitle', { testName: test.translated_name || test.name })}
            </p>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              color: '#667eea', 
              marginBottom: '32px',
            }}>
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

  // Personality Test - Full Redesign
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF3F0 0%, #FFE9E5 100%)',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '40px' : '60px',
    }}>
      {/* HEADER SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px', maxWidth: '800px' }}
      >
        <h1 style={{
          fontSize: isMobile ? '32px' : '48px',
          fontWeight: 'bold',
          color: '#FF7C7C',
          marginBottom: '16px',
        }}>
          {t('tests.personality.payment.header_title') || 'Your Personality Type is Ready!'}
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#666',
          marginBottom: '24px',
          lineHeight: '1.6',
        }}>
          {t('tests.personality.payment.header_subtitle') || 'Deep analysis completed. Access your personal results below.'}
        </p>
        <motion.button
          onClick={scrollToPayment}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #FF9A9E 0%, #FFD6A5 100%)',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(255, 154, 158, 0.3)',
          }}
        >
          {t('tests.personality.payment.scroll_button') || 'View My Personality Type'}
        </motion.button>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: isMobile ? '40px' : '60px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{f.icon}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#333' }}>
              {f.title}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* BENEFITS */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          maxWidth: '1200px',
          width: '100%',
          background: 'white',
          borderRadius: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          padding: isMobile ? '32px' : '48px',
          marginBottom: isMobile ? '40px' : '60px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '32px' : '48px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#333' }}>
            {t('tests.personality.payment.benefits_title') || 'How You Will Benefit'}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {benefits.map((b, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                fontSize: '16px',
                color: '#555',
              }}>
                <span style={{ color: '#4A90E2', fontSize: '20px' }}>✔</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#333' }}>
            {t('tests.personality.payment.how_to_apply_title') || 'Learn How to Apply It'}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {howToApply.map((b, i) => (
              <li key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                fontSize: '16px',
                color: '#555',
              }}>
                <span style={{ color: '#4A90E2', fontSize: '20px' }}>✔</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* TESTIMONIALS */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          textAlign: 'center',
          marginBottom: isMobile ? '40px' : '60px',
          maxWidth: '1200px',
          width: '100%',
        }}
      >
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
          {t('tests.personality.payment.testimonials_title') || 'Reviews'}
        </h2>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
          4.7 ★ 1769 {t('tests.personality.payment.reviews') || 'reviews'}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div style={{ color: '#FFD700', fontSize: '18px', marginBottom: '12px', letterSpacing: '2px' }}>
                ★★★★★
              </div>
              <p style={{
                fontStyle: 'italic',
                color: '#555',
                marginBottom: '16px',
                fontSize: '15px',
                lineHeight: '1.6',
              }}>
                "{t.text}"
              </p>
              <p style={{
                fontSize: '13px',
                color: '#888',
              }}>
                {t.name} — {t.city}, {t.country}, {t.time}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* PAYMENT SECTION */}
      <motion.section
        ref={paymentRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          padding: isMobile ? '32px' : '48px',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          marginBottom: isMobile ? '40px' : '60px',
        }}
      >
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#FF7C7C',
          marginBottom: '16px',
        }}>
          {t('tests.personality.payment.title') || 'View Your Test Results'}
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '24px',
          lineHeight: '1.6',
        }}>
          {t('tests.personality.payment.description') || 'Access your complete detailed personality analysis report immediately.'}
        </p>
        <p style={{
          fontSize: '36px',
          fontWeight: '600',
          color: '#FF7C7C',
          marginBottom: '32px',
        }}>
          {t('tests.personality.payment.amount') || '$1.95 USD'}
        </p>

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

        <p style={{
          fontSize: '12px',
          color: '#888',
          marginTop: '20px',
          lineHeight: '1.5',
        }}>
          {t('tests.personality.payment.after_payment') || 'You will have instant access to your personal results after payment.'}
        </p>
      </motion.section>

      {/* FAQ SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          maxWidth: '800px',
          width: '100%',
          marginBottom: isMobile ? '40px' : '60px',
        }}
      >
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '32px',
          textAlign: 'center',
          color: '#333',
        }}>
          {t('tests.personality.payment.faq_title') || 'Frequently Asked Questions'}
        </h2>
        {faqs.map((f, i) => (
          <details
            key={i}
            style={{
              background: 'white',
              borderRadius: '16px',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              padding: '20px',
              cursor: 'pointer',
            }}
          >
            <summary style={{
              fontWeight: '600',
              fontSize: '18px',
              color: '#333',
              marginBottom: '12px',
              listStyle: 'none',
            }}>
              {f.q}
            </summary>
            <p style={{
              color: '#666',
              marginTop: '12px',
              fontSize: '15px',
              lineHeight: '1.6',
            }}>
              {f.a}
            </p>
          </details>
        ))}
      </motion.section>

      {/* LATEST RESULTS */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          padding: isMobile ? '32px' : '48px',
          maxWidth: '1200px',
          width: '100%',
          marginBottom: '40px',
        }}
      >
        <h2 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '32px',
          textAlign: 'center',
          color: '#333',
        }}>
          {t('tests.personality.payment.latest_results_title') || 'Latest Results'}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '20px',
        }}>
          {latestResults.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <p style={{ fontSize: '36px', marginBottom: '8px' }}>{r.flag}</p>
              <p style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px', color: '#333' }}>
                {r.name}
              </p>
              <p style={{ fontSize: '14px', color: '#4A90E2' }}>{r.type}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

export default PaymentPage;
