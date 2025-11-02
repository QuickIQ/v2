import { useTranslation } from 'react-i18next';
import '../../App.css';

function CalculatingPage() {
  const { t } = useTranslation();

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🧠</div>
        <h1 style={{ fontSize: '42px', marginBottom: '16px' }}>
          {t('test.calculating.title')}
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>
          {t('test.calculating.subtitle')}
        </p>
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.3)', borderTop: '4px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default CalculatingPage;

