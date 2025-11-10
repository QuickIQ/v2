import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

interface Props {
  onContinue: () => void;
}

function PersonalityUnlockPage({ onContinue }: Props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();

  // Auto-redirect to results after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF3F0 0%, #FFE9E5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: isMobile ? '40px 24px' : '60px 48px',
          textAlign: 'center',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            fontSize: '64px',
            marginBottom: '24px',
          }}
        >
          🎉
        </motion.div>
        
        <h1 style={{
          fontSize: isMobile ? '28px' : '36px',
          fontWeight: 'bold',
          color: '#FF7C7C',
          marginBottom: '16px',
        }}>
          {i18n.language === 'tr' ? 'Ödeme Başarılı!' : 'Payment Successful!'}
        </h1>
        
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#666',
          marginBottom: '32px',
          lineHeight: '1.6',
        }}>
          {i18n.language === 'tr' 
            ? 'Kişisel sonuçlarınıza erişim şimdi aktif. Sonuçlarınıza yönlendiriliyorsunuz...'
            : 'Access to your personal results is now active. Redirecting to your results...'}
        </p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'linear' }}
          style={{
            height: '4px',
            background: 'linear-gradient(135deg, #FF9A9E 0%, #FFD6A5 100%)',
            borderRadius: '2px',
            marginTop: '24px',
          }}
        />
      </motion.div>
    </div>
  );
}

export default PersonalityUnlockPage;



