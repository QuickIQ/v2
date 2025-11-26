import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useMobile } from '../../hooks/useMobile';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import '../../App.css';

export default function IQTestPaywallPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const [processing, setProcessing] = useState(false);

  // Get score from sessionStorage
  const score = sessionStorage.getItem('iqtest_score');
  const email = sessionStorage.getItem('iqtest_email');

  useEffect(() => {
    // If no score, redirect back to test
    if (!score) {
      navigate('/test/iqtest');
    }
  }, [score, navigate]);

  const handlePaymentSuccess = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      // Navigate to results with score
      navigate(`/test/iqtest/results?score=${score}`);
    }, 2000);
  };

  if (!score) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '100px' : '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: isMobile ? '100%' : '600px',
          width: '100%',
          background: 'white',
          borderRadius: '24px',
          padding: isMobile ? '24px' : '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '16px',
          }}>
            {t('tests.iq.paywall.title') || 'Unlock Your IQ Results'}
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            lineHeight: '1.6',
          }}>
            {t('tests.iq.paywall.subtitle') || 'Get your detailed IQ analysis and personalized insights'}
          </p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <Shield size={24} color="#667eea" />
            <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>
              {t('tests.iq.paywall.secure') || 'Secure Payment'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <Lock size={20} color="#667eea" />
            <span style={{ fontSize: '14px', color: '#666' }}>
              {t('tests.iq.paywall.encrypted') || 'Your payment is encrypted and secure'}
            </span>
          </div>
        </div>

        <motion.button
          onClick={handlePaymentSuccess}
          disabled={processing}
          whileHover={{ scale: processing ? 1 : 1.02 }}
          whileTap={{ scale: processing ? 1 : 0.98 }}
          style={{
            width: '100%',
            padding: isMobile ? '16px' : '20px',
            background: processing 
              ? '#9CA3AF' 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            cursor: processing ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: processing 
              ? 'none' 
              : '0 4px 12px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          {processing ? (
            <>
              <div 
                className="spinner"
                style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '3px solid white',
                  borderRadius: '50%',
                }} 
              />
              {t('tests.iq.paywall.processing') || 'Processing...'}
            </>
          ) : (
            <>
              <CreditCard size={20} />
              {t('tests.iq.paywall.pay_now') || 'Pay Now - $9.99'}
            </>
          )}
        </motion.button>

        <div style={{
          marginTop: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#666',
        }}>
          <CheckCircle size={16} color="#10B981" />
          <span>{t('tests.iq.paywall.guarantee') || '30-day money-back guarantee'}</span>
        </div>
      </motion.div>
    </div>
  );
}

