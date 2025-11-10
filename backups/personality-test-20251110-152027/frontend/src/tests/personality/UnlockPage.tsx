import { useTranslation } from 'react-i18next';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { usePersonalityTestStore } from '../../store/personalityTestStore';
import '../../App.css';

// Dynamic imports for all personality unlock pages
const PersonalityUnlockComponents: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'INFP': () => import('./unlock/PersonalityUnlock_INFP'),
  'ENFP': () => import('./unlock/PersonalityUnlock_ENFP'),
  'INFJ': () => import('./unlock/PersonalityUnlock_INFJ'),
  'ENFJ': () => import('./unlock/PersonalityUnlock_ENFJ'),
  'INTJ': () => import('./unlock/PersonalityUnlock_INTJ'),
  'ENTJ': () => import('./unlock/PersonalityUnlock_ENTJ'),
  'INTP': () => import('./unlock/PersonalityUnlock_INTP'),
  'ENTP': () => import('./unlock/PersonalityUnlock_ENTP'),
  'ISFP': () => import('./unlock/PersonalityUnlock_ISFP'),
  'ESFP': () => import('./unlock/PersonalityUnlock_ESFP'),
  'ISFJ': () => import('./unlock/PersonalityUnlock_ISFJ'),
  'ESFJ': () => import('./unlock/PersonalityUnlock_ESFJ'),
  'ISTP': () => import('./unlock/PersonalityUnlock_ISTP'),
  'ESTP': () => import('./unlock/PersonalityUnlock_ESTP'),
  'ISTJ': () => import('./unlock/PersonalityUnlock_ISTJ'),
  'ESTJ': () => import('./unlock/PersonalityUnlock_ESTJ'),
};

function LoadingFallback() {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFF4F1 0%, #FFE8E2 100%)',
      padding: isMobile ? '20px' : '40px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        padding: isMobile ? '40px 24px' : '60px 48px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>⏳</div>
        <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#666' }}>
          {t('common.loading') || 'Loading...'}
        </p>
      </div>
    </main>
  );
}

function NoTypeFallback() {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #FFF4F1 0%, #FFE8E2 100%)',
      padding: isMobile ? '20px' : '40px',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        padding: isMobile ? '40px 24px' : '60px 48px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
        <h1 style={{
          fontSize: isMobile ? '28px' : '36px',
          fontWeight: 'bold',
          color: '#FF7C7C',
          marginBottom: '16px',
        }}>
          {t('tests.personality.unlock.title') || (i18n.language === 'tr' ? 'Ödeme Başarılı!' : 'Access Granted 🎉')}
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#666',
          lineHeight: '1.6',
        }}>
          {t('tests.personality.unlock.description') || (i18n.language === 'tr' 
            ? 'Kişisel sonuçlarınıza erişim artık aktif!'
            : 'Your personalized personality results are now unlocked. You can view them on your dashboard.')}
        </p>
      </div>
    </main>
  );
}

export default function UnlockPage() {
  const [searchParams] = useSearchParams();
  const { personalityType } = usePersonalityTestStore();
  const [UnlockComponent, setUnlockComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get type from URL to use as dependency (prevents infinite loops)
  const urlType = searchParams.get('type')?.toUpperCase() || null;

  useEffect(() => {
    let isMounted = true;
    let loadingState = true;
    
    const timeoutId = setTimeout(() => {
      if (isMounted && loadingState) {
        console.error('Component loading timeout after 15 seconds');
        setError('Component took too long to load. Please check the browser console for details.');
        setLoading(false);
        loadingState = false;
      }
    }, 15000); // 15 second timeout (increased for slower networks)

    const loadComponent = async () => {
      if (!isMounted) return;
      
      loadingState = true;
      setLoading(true);
      setError(null);
      let typeToLoad: string | null = null;

      // Priority 1: Check URL parameter first (most reliable for direct navigation from control panel)
      if (urlType && PersonalityUnlockComponents[urlType]) {
        typeToLoad = urlType;
        // Sync to localStorage and Zustand store
        localStorage.setItem('personality_result', JSON.stringify({
          typeCode: typeToLoad,
          typeName: typeToLoad, // Will be updated from result data if available
        }));
        usePersonalityTestStore.getState().setPersonalityType(typeToLoad);
      }

      // Priority 2: Check localStorage if URL param not available
      if (!typeToLoad) {
        try {
          const saved = localStorage.getItem('personality_result');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.typeCode && PersonalityUnlockComponents[parsed.typeCode]) {
              typeToLoad = parsed.typeCode;
              // Also sync to Zustand store
              usePersonalityTestStore.getState().setPersonalityType(parsed.typeCode);
            }
          }
        } catch (e) {
          console.error('Error loading from localStorage:', e);
          if (isMounted) {
            setError('Failed to load from localStorage');
          }
        }
      }

      // Priority 3: Use Zustand store if neither URL nor localStorage had it
      if (!typeToLoad && personalityType && PersonalityUnlockComponents[personalityType]) {
        typeToLoad = personalityType;
      }

      // Load the component
      if (typeToLoad && PersonalityUnlockComponents[typeToLoad]) {
        try {
          console.log('Loading unlock component for type:', typeToLoad);
          console.log('Import path:', `./unlock/PersonalityUnlock_${typeToLoad}`);
          
          const startTime = Date.now();
          const Component = await PersonalityUnlockComponents[typeToLoad]();
          const loadTime = Date.now() - startTime;
          
          console.log(`Component loaded in ${loadTime}ms for type:`, typeToLoad);
          
          if (!isMounted) return; // Component unmounted during load
          
          if (Component && Component.default) {
            setUnlockComponent(() => Component.default);
            console.log('Successfully loaded component for type:', typeToLoad);
          } else {
            console.error('Component loaded but default export is missing for type:', typeToLoad);
            console.error('Component object:', Component);
            setError(`Component for ${typeToLoad} is missing default export. Check console for details.`);
            setUnlockComponent(null);
          }
        } catch (error: any) {
          console.error('Error loading unlock component:', error);
          console.error('Error stack:', error?.stack);
          console.error('Error details:', {
            message: error?.message,
            name: error?.name,
            type: typeToLoad,
            importPath: `./unlock/PersonalityUnlock_${typeToLoad}`
          });
          
          if (isMounted) {
            const errorMessage = error?.message || 'Unknown error';
            setError(`Failed to load component for ${typeToLoad}: ${errorMessage}. Check browser console for details.`);
            setUnlockComponent(null);
          }
        }
      } else {
        if (!isMounted) return;
        
        if (!typeToLoad) {
          setError('No personality type found. Please select a type from the control panel.');
        } else {
          setError(`Personality type ${typeToLoad} is not supported.`);
        }
        setUnlockComponent(null);
      }

      if (isMounted) {
        loadingState = false;
        setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    loadComponent();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [urlType, personalityType]); // Use urlType instead of searchParams to prevent infinite loops

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    return (
      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF4F1 0%, #FFE8E2 100%)',
        padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>⚠️</div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#FF6B6B',
            marginBottom: '16px',
          }}>
            Error Loading Page
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '24px',
          }}>
            {error}
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #FF7B8A 0%, #FFAF6D 100%)',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(255, 123, 138, 0.3)',
            }}
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  if (!UnlockComponent) {
    return <NoTypeFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <UnlockComponent />
    </Suspense>
  );
}
