import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

export default function UnlockPage() {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();

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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: isMobile ? '40px 24px' : '60px 48px',
          textAlign: 'center',
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
          {t('tests.personality.unlock.title') || (i18n.language === 'tr' ? 'Ödeme Başarılı!' : 'Access Granted 🎉')}
        </h1>
        
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#666',
          lineHeight: '1.6',
        }}>
          {t('tests.personality.unlock.description') || (i18n.language === 'tr' 
            ? 'Kişisel sonuçlarınıza erişim artık aktif!'
            : 'Your personalized personality results are now unlocked. You can view them on your dashboard.')}
        </p>
      </motion.div>
    </main>
  );
}

