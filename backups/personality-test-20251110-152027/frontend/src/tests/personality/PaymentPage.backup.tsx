import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();

  const handlePayment = () => {
    setTimeout(() => {
      navigate('/test/personality/unlock');
    }, 1000);
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFF4F1 0%, #FFE8E2 100%)',
      padding: isMobile ? '20px' : '40px',
      textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: isMobile ? '32px 24px' : '48px',
        }}
      >
        <h1 style={{
          fontSize: isMobile ? '28px' : '36px',
          fontWeight: 'bold',
          color: '#FF7C7C',
          marginBottom: '16px',
        }}>
          {t('tests.personality.payment.title') || 'Payment'}
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#666',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          {t('tests.personality.payment.description') || 'Complete your payment to unlock your detailed personality results.'}
        </p>

        <div style={{
          border: '2px solid #e0e0e0',
          borderRadius: '24px',
          padding: '32px',
          marginBottom: '24px',
          background: 'rgba(255, 255, 255, 0.5)',
        }}>
          <p style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '12px',
          }}>
            {t('tests.personality.payment.label') || 'Test Results Access Fee'}
          </p>
          <p style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#FF7C7C',
            marginBottom: '24px',
          }}>
            {t('tests.personality.payment.amount') || (i18n.language === 'tr' ? '₺59,00' : '$1.95 USD')}
          </p>
          <motion.button
            onClick={handlePayment}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255, 143, 163, 0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            {t('tests.personality.payment.continue_button') || 'Continue'}
          </motion.button>
        </div>

        <p style={{
          fontSize: '12px',
          color: '#888',
          lineHeight: '1.5',
        }}>
          {t('tests.personality.payment.footer') || (i18n.language === 'tr' 
            ? 'Ödeme sonrası sonuç sayfasına otomatik yönlendirileceksiniz.'
            : 'You will be automatically redirected to the results page after payment.')}
        </p>
      </motion.div>
    </main>
  );
}

