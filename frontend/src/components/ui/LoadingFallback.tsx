import { useTranslation } from 'react-i18next';

interface LoadingFallbackProps {
  message?: string;
  testId?: string;
}

export function LoadingFallback({ message, testId }: LoadingFallbackProps) {
  const { t } = useTranslation();
  const displayMessage = message || t('common.loading') || 'Loading...';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
    }}>
      <div className="loading" style={{ fontSize: '18px', color: '#6c63ff' }}>
        {displayMessage}
      </div>
    </div>
  );
}

