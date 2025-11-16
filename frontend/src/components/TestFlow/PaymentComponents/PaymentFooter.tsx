import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface PaymentFooterProps {
  testId: string;
}

export function PaymentFooter({ testId }: PaymentFooterProps) {
  const { t, i18n } = useTranslation();
  
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      style={{
        textAlign: 'center',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '16px',
        marginTop: '64px',
        marginBottom: '32px',
      }}
    >
      <p style={{
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.6',
      }}>
        {getTranslation(`tests.${testId}.payment.footer`, i18n.language === 'tr'
          ? 'Başarılı ödemeden sonra sonuçlarınıza yönlendirileceksiniz. Verileriniz gizli tutulur.'
          : 'You\'ll be redirected to your results after successful payment. Your data remains private.')}
      </p>
    </motion.div>
  );
}

