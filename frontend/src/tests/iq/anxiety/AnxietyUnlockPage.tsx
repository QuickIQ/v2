import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAnxietyTestStore } from '../../../store/anxietyTestStore';
import AnxietyUnlockTemplate from './AnxietyUnlockTemplate';
import '../../../App.css';

function LoadingFallback() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="loading" style={{ fontSize: '18px', color: '#6c63ff' }}>
        Loading your results...
      </div>
    </main>
  );
}

function NoResultFallback() {
  const { i18n } = useTranslation();
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '32px',
        padding: '48px',
        boxShadow: '0 20px 60px rgba(108, 99, 255, 0.15)',
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '16px',
        }}>
          {i18n.language === 'tr' ? 'Sonuç Bulunamadı' : 'No Results Found'}
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.6',
        }}>
          {i18n.language === 'tr'
            ? 'Kaygı testi sonuçlarınız bulunamadı. Lütfen testi tekrar tamamlayın.'
            : 'Your anxiety test results were not found. Please complete the test again.'}
        </p>
      </div>
    </main>
  );
}

export default function AnxietyUnlockPage() {
  const { i18n } = useTranslation();
  const { level: urlLevel } = useParams<{ level?: string }>();
  const { resultLevel } = useAnxietyTestStore();
  const [levelToLoad, setLevelToLoad] = useState<'excellent' | 'good' | 'developing' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let level: 'excellent' | 'good' | 'developing' | null = null;

    // Priority 1: Check URL parameter (for developer shortcuts)
    if (urlLevel && ['excellent', 'good', 'developing'].includes(urlLevel)) {
      level = urlLevel as 'excellent' | 'good' | 'developing';
    }

    // Priority 2: Check Zustand store
    if (!level && resultLevel) {
      level = resultLevel;
    }

    // Priority 3: Check localStorage if store doesn't have it
    if (!level) {
      try {
        const saved = localStorage.getItem('anxiety-test-storage');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Zustand persist saves the partialized state directly
          if (parsed.resultLevel && ['excellent', 'good', 'developing'].includes(parsed.resultLevel)) {
            level = parsed.resultLevel as 'excellent' | 'good' | 'developing';
          }
        }
      } catch (e) {
        console.error('Error loading from localStorage:', e);
      }
    }

    setLevelToLoad(level);
    setLoading(false);
  }, [resultLevel, urlLevel]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!levelToLoad) {
    return <NoResultFallback />;
  }

  // Get locale from i18n
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';

  return (
    <AnxietyUnlockTemplate
      level={levelToLoad}
      locale={locale}
    />
  );
}

