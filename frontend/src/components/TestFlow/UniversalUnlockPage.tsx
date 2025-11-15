import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import UniversalUnlockTemplate from './UniversalUnlockTemplate';
import { getTestConfig } from '../../utils/testContentLoader';
// Import storeMap from testPageFactory
import { storeMap } from '../../utils/testPageFactory';
import '../../App.css';

interface UniversalUnlockPageProps {
  testId?: string; // Optional, can be derived from URL
}

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

function NoResultFallback({ testId }: { testId: string }) {
  const { i18n } = useTranslation();
  const testConfig = getTestConfig(testId);
  const testName = testConfig?.name?.[i18n.language === 'tr' ? 'tr' : 'en'] || testId;

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
            ? `${testName} testi sonuçlarınız bulunamadı. Lütfen testi tekrar tamamlayın.`
            : `Your ${testName} test results were not found. Please complete the test again.`}
        </p>
      </div>
    </main>
  );
}

export default function UniversalUnlockPage({ testId: testIdProp }: UniversalUnlockPageProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { level: urlLevel } = useParams<{ level?: string }>();
  
  // Get testId from prop or derive from URL slug
  let testId = testIdProp || '';
  
  if (!testId) {
    // Extract slug from URL path (e.g., "/test/creative-thinking/unlock/excellent" -> "creative-thinking")
    const pathMatch = location.pathname.match(/\/test\/([^/]+)/);
    if (pathMatch) {
      const slug = pathMatch[1];
      const testConfig = getTestConfig(slug);
      testId = testConfig?.id || slug;
    }
  }
  
  // Get store from storeMap
  const useTestStore = storeMap[testId];
  
  if (!useTestStore) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="error">
          Test store not found for: {testId}
        </div>
      </div>
    );
  }
  
  const { resultLevel } = useTestStore();
  const [levelToLoad, setLevelToLoad] = useState<'excellent' | 'good' | 'developing' | null>(null);
  const [loading, setLoading] = useState(true);

  // Generate storage key from testId
  const storageKey = `${testId}-test-storage`;

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
        const saved = localStorage.getItem(storageKey);
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
  }, [resultLevel, urlLevel, storageKey]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!levelToLoad) {
    return <NoResultFallback testId={testId} />;
  }

  // Get locale from i18n
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';

  return (
    <UniversalUnlockTemplate
      testId={testId}
      level={levelToLoad}
      locale={locale}
    />
  );
}

