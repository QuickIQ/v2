import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Test } from '../../types';
import { Logo } from '../ui/Logo';
import '../../App.css';

interface Props {
  test: Test;
  onStart: () => void;
}

function LandingPage({ test, onStart }: Props) {
  const { t } = useTranslation();

  return (
    <div className="app">
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="container" style={{ textAlign: 'center', color: 'white' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '32px' }}
        >
          <Logo size={100} animated={true} showText={false} />
        </motion.div>
        <h1 style={{ fontSize: '56px', marginBottom: '24px', fontWeight: 'bold' }}>
          {t('test.landing.title', { testName: test.translated_name || test.name })}
        </h1>
          <p style={{ fontSize: '24px', marginBottom: '16px', opacity: 0.95 }}>
            {t('test.landing.description', { testName: test.translated_name || test.name })}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px 24px', borderRadius: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{t('test.landing.questions')}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '16px 24px', borderRadius: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{t('test.landing.duration')}</div>
            </div>
          </div>
          <button className="btn btn-primary btn-large" onClick={onStart} style={{ fontSize: '20px', padding: '18px 48px' }}>
            {t('test.landing.startButton')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

