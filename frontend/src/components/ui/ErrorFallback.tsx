import { useTranslation } from 'react-i18next';

interface ErrorFallbackProps {
  error?: string | null;
  testId?: string;
  title?: string;
}

export function ErrorFallback({ error, testId, title }: ErrorFallbackProps) {
  const { i18n } = useTranslation();
  const language = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  const defaultTitle = language === 'tr' 
    ? '⚠️ İçerik Yükleme Hatası'
    : '⚠️ Content Loading Error';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      padding: '40px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '24px', color: '#ff4444', marginBottom: '16px' }}>
        {title || defaultTitle}
      </div>
      {testId && (
        <div style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
          {language === 'tr' ? 'Test ID:' : 'Test ID:'} <strong>{testId}</strong>
        </div>
      )}
      {error && (
        <div style={{ fontSize: '14px', color: '#888', maxWidth: '600px' }}>
          {error}
        </div>
      )}
      <div style={{ fontSize: '14px', color: '#888', marginTop: '16px' }}>
        {language === 'tr' 
          ? 'Lütfen tarayıcı konsolunu kontrol edin.'
          : 'Please check the browser console for more details.'}
      </div>
    </div>
  );
}

