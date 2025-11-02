import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Test, TestResult } from '../../types';
import IQResult from './IQResult';
import PersonalityResult from './PersonalityResult';
import '../../App.css';

interface Props {
  test: Test;
  result: TestResult;
}

function ResultsPage({ test, result }: Props) {
  const { t } = useTranslation();

  return (
    <div className="app" style={{ minHeight: '100vh', padding: '40px 20px', background: '#f8f9fa' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', marginBottom: '32px', color: '#333' }}>
            {t('test.results.title')}
          </h1>

          {test.test_type === 'iq' && result.score !== undefined && (
            <>
              {/* Use enhanced version if available */}
              {(() => {
                try {
                  const EnhancedIQResult = require('./EnhancedIQResult').EnhancedIQResult;
                  return <EnhancedIQResult score={result.score} result={result} />;
                } catch {
                  return <IQResult score={result.score} result={result} />;
                }
              })()}
            </>
          )}

          {test.test_type === 'personality' && result.type && (
            <PersonalityResult type={result.type} result={result} />
          )}

          {test.test_type === 'standard' && (
            <div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '24px',
                }}
              >
                {result.score}
              </div>
              <div style={{ fontSize: '20px', color: '#666', marginBottom: '32px' }}>
                {result.result_text || result.result_text_key}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
            <Link to={`/test/${test.slug}`} className="btn btn-secondary">
              {t('test.results.retake')}
            </Link>
            <Link to="/" className="btn btn-primary">
              {t('test.results.home')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;

