import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../App.css';

interface Props {
  onSubmit: (email: string) => void;
}

function EmailCapturePage({ onSubmit }: Props) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError(t('test.emailCapture.emailRequired'));
      return;
    }
    onSubmit(email);
  };

  return (
    <div className="app" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', marginBottom: '16px', color: '#333' }}>
            {t('test.emailCapture.title')}
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '32px', color: '#666' }}>
            {t('test.emailCapture.subtitle')}
          </p>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="input"
              placeholder={t('test.emailCapture.emailPlaceholder')}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              style={{ marginBottom: '24px' }}
            />

            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>
              {t('test.emailCapture.continue')}
            </button>
          </form>

          <p style={{ fontSize: '12px', color: '#999', marginTop: '24px' }}>
            {t('test.emailCapture.privacy')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailCapturePage;

