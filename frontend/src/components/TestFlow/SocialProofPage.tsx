import { useTranslation } from 'react-i18next';
import '../../App.css';

interface Props {
  onContinue: () => void;
}

function SocialProofPage({ onContinue }: Props) {
  const { t } = useTranslation();

  return (
    <div className="app">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: '#f8f9fa' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '16px', color: '#333' }}>
            {t('test.socialProof.title')}
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '48px', color: '#666' }}>
            {t('test.socialProof.subtitle')}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <div className="card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
              <p style={{ fontSize: '16px', color: '#666', fontStyle: 'italic' }}>
                "{t('test.socialProof.testimonial1')}"
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
              <p style={{ fontSize: '16px', color: '#666', fontStyle: 'italic' }}>
                "{t('test.socialProof.testimonial2')}"
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
              <p style={{ fontSize: '16px', color: '#666', fontStyle: 'italic' }}>
                "{t('test.socialProof.testimonial3')}"
              </p>
            </div>
          </div>

          <button className="btn btn-primary btn-large" onClick={onContinue}>
            {t('common.continue')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialProofPage;

