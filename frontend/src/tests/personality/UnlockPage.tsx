import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { usePersonalityTestStore } from '../../store/personalityTestStore';
import PersonalityUnlockTemplate from './unlock/PersonalityUnlockTemplate';
import '../../App.css';

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
  const { i18n } = useTranslation();
  const [typeToLoad, setTypeToLoad] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get type from URL to use as dependency (prevents infinite loops)
  const urlType = searchParams.get('type')?.toUpperCase() || null;

  useEffect(() => {
    let type: string | null = null;

    // Priority 1: Check URL parameter first (most reliable for direct navigation)
    if (urlType) {
      type = urlType;
      // Sync to localStorage and Zustand store
      localStorage.setItem('personality_result', JSON.stringify({
        typeCode: type,
        typeName: type,
      }));
      usePersonalityTestStore.getState().setPersonalityType(type);
    }

    // Priority 2: Check localStorage if URL param not available
    if (!type) {
      try {
        const saved = localStorage.getItem('personality_result');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.typeCode) {
            type = parsed.typeCode;
            // Also sync to Zustand store
            usePersonalityTestStore.getState().setPersonalityType(parsed.typeCode);
          }
        }
      } catch (e) {
        console.error('Error loading from localStorage:', e);
      }
    }

    // Priority 3: Use Zustand store if neither URL nor localStorage had it
    if (!type && personalityType) {
      type = personalityType;
    }

    setTypeToLoad(type);
    setLoading(false);
  }, [urlType, personalityType]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (!typeToLoad) {
    return <NoTypeFallback />;
  }

  // Get locale from i18n
  const locale = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';

  return (
    <PersonalityUnlockTemplate
      type={typeToLoad}
      locale={locale}
    />
  );
}
