import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Logo } from '../../components/ui/Logo';
import '../../App.css';

interface Props {
  onStart: () => void;
}

function PersonalityLanding({ onStart }: Props) {
  const { t } = useTranslation();

  return (
    <div className="app">
      <div style={{ 
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px' 
      }}>
        <div className="container" style={{ textAlign: 'center', color: '#333', maxWidth: '800px' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '32px' }}
          >
            <Logo size={100} animated={true} showText={false} />
          </motion.div>
          
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '56px', marginBottom: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {t('tests.personality.landing.title')}
          </motion.h1>
          
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: '24px', marginBottom: '16px', opacity: 0.8, color: '#555' }}
          >
            {t('tests.personality.landing.subtitle')}
          </motion.p>
          
          <motion.p 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.7, color: '#666' }}
          >
            {t('tests.personality.landing.description')}
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '24px', 
              marginBottom: '40px', 
              flexWrap: 'wrap' 
            }}
          >
            <div style={{ 
              background: 'rgba(236, 72, 153, 0.1)', 
              padding: '16px 24px', 
              borderRadius: '12px',
              border: '1px solid rgba(236, 72, 153, 0.2)'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ec4899' }}>
                {t('tests.personality.questions_count')}
              </div>
            </div>
            <div style={{ 
              background: 'rgba(236, 72, 153, 0.1)', 
              padding: '16px 24px', 
              borderRadius: '12px',
              border: '1px solid rgba(236, 72, 153, 0.2)'
            }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ec4899' }}>
                {t('tests.personality.duration')}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button 
              className="btn btn-primary btn-large" 
              onClick={onStart} 
              style={{ 
                fontSize: '20px', 
                padding: '18px 48px',
                background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(236, 72, 153, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(236, 72, 153, 0.4)';
              }}
            >
              {t('tests.personality.flow.start_test')}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PersonalityLanding;

