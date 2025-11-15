import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { testApi } from '../services/api';
import { Test } from '../types';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Logo } from '../components/ui/Logo';
import { useMobile } from '../hooks/useMobile';
import { TestCard } from '../components/ui/TestCard';
import { getAllTestConfigs, getTestConfig } from '../utils/testContentLoader';
import { StatsSection } from '../components/ui/StatsSection';
import { TestsCompletedCounter } from '../components/ui/TestsCompletedCounter';
import { DiscoverYourMindCard } from '../components/ui/DiscoverYourMindCard';
import { CategorySection } from '../components/ui/CategorySection';
import { DeveloperControlPanel } from '../components/ui/DeveloperControlPanel';
import '../App.css';

function Home() {
  const { t, i18n } = useTranslation();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMobile();
  
  // Get test configs for TestCard component
  const testConfigs = getAllTestConfigs();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await testApi.getAll('en');
        
        // Get IQ and Personality test configs from test-config.json
        const iqTestConfig = getTestConfig('iqtest');
        const personalityTestConfig = getTestConfig('personality');
        
        // Convert configs to Test objects for API compatibility
        const specialTests: Test[] = [];
        
        if (iqTestConfig) {
          specialTests.push({
            id: 999999,
            name: iqTestConfig.name.en,
            slug: iqTestConfig.slug,
            category: iqTestConfig.category,
            enabled: true,
            default_language: 'en',
            is_premium: false,
            price_cents: 0,
            test_type: 'iq',
            translated_name: iqTestConfig.name.tr || iqTestConfig.name.en,
          });
        }
        
        if (personalityTestConfig) {
          specialTests.push({
            id: 999998,
            name: personalityTestConfig.name.en,
            slug: personalityTestConfig.slug,
            category: personalityTestConfig.category,
            enabled: true,
            default_language: 'en',
            is_premium: false,
            price_cents: 0,
            test_type: 'personality',
            translated_name: personalityTestConfig.name.tr || personalityTestConfig.name.en,
          });
        }
        setTests([...specialTests, ...data]);
      } catch (err: any) {
        setError(err.message || t('common.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [t]);

  // Proximity-based pop-out effect for Lookmagic icon - fast grow, smooth return, with shadow
  useEffect(() => {
    const icon = document.querySelector('.lookmagic-icon') as HTMLElement;
    if (!icon) return;

    let curScale = 1;
    let curShadowIntensity = 0;
    let targetScale = 1;
    let targetShadowIntensity = 0;
    let isHovering = false;
    let rafId: number | null = null;

    // Base shadow that's always present
    const baseShadow = 'drop-shadow(0 8px 24px rgba(108, 99, 255, 0.25))';

    // Smooth easing for fluid animation
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function animate() {
      // Fast on hover (0.3), smooth on leave (0.15)
      const speed = isHovering ? 0.3 : 0.15;
      
      curScale = lerp(curScale, targetScale, speed);
      curShadowIntensity = lerp(curShadowIntensity, targetShadowIntensity, speed);

      // Apply transform directly - use !important to override any CSS transitions
      icon.style.setProperty('transform', `scale(${curScale})`, 'important');
      icon.style.setProperty('-webkit-transform', `scale(${curScale})`, 'important');
      
      // Combine base shadow with additional hover shadow
      const additionalShadowBlur = 35 * curShadowIntensity;
      const additionalShadowOpacity = 0.5 * curShadowIntensity;
      const additionalShadow = curShadowIntensity > 0.01
        ? ` drop-shadow(0 ${12 + curShadowIntensity * 10}px ${additionalShadowBlur}px rgba(108, 99, 255, ${additionalShadowOpacity}))`
        : '';
      
      icon.style.setProperty('filter', baseShadow + additionalShadow, 'important');
      icon.style.setProperty('-webkit-filter', baseShadow + additionalShadow, 'important');

      // Continue animating until fully settled
      if (Math.abs(curScale - targetScale) > 0.001 || Math.abs(curShadowIntensity - targetShadowIntensity) > 0.001) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = null;
      }
    }

    function pointerMove(e: MouseEvent) {
      const rect = icon.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const dist = Math.hypot(dx, dy);
      const maxDist = rect.width / 2;

      let intensity = 1 - Math.min(dist / maxDist, 1);
      intensity = Math.pow(intensity, 1.8); // Smoother falloff

      targetScale = 1 + intensity * 0.25; // 1 → 1.25 (more dramatic)
      targetShadowIntensity = intensity;

      if (!rafId) {
        animate();
      }
    }

    const handlePointerEnter = (e: MouseEvent) => {
      isHovering = true;
      pointerMove(e); // Immediately calculate position
      if (!rafId) animate();
    };

    const handlePointerLeave = () => {
      isHovering = false;
      targetScale = 1;
      targetShadowIntensity = 0;
      if (!rafId) animate();
    };

    // Use both mouse and pointer events for better compatibility
    icon.addEventListener('mouseenter', handlePointerEnter as EventListener);
    icon.addEventListener('mousemove', pointerMove);
    icon.addEventListener('mouseleave', handlePointerLeave);
    icon.addEventListener('pointerenter', handlePointerEnter as EventListener);
    icon.addEventListener('pointermove', pointerMove);
    icon.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      icon.removeEventListener('mouseenter', handlePointerEnter as EventListener);
      icon.removeEventListener('mousemove', pointerMove);
      icon.removeEventListener('mouseleave', handlePointerLeave);
      icon.removeEventListener('pointerenter', handlePointerEnter as EventListener);
      icon.removeEventListener('pointermove', pointerMove);
      icon.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
      // Reset styles on cleanup
      icon.style.removeProperty('transform');
      icon.style.removeProperty('-webkit-transform');
      icon.style.removeProperty('filter');
      icon.style.removeProperty('-webkit-filter');
    };
  }, [tests, loading]); // Run after tests are loaded to ensure icon exists

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  if (error && tests.length === 0) {
    return (
      <div className="app">
        <header style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '60px 20px', color: 'white', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>{t('home.title')}</h1>
            <p style={{ fontSize: '20px', opacity: 0.9 }}>{t('home.subtitle')}</p>
          </div>
        </header>

        <div className="container" style={{ paddingTop: '40px' }}>
          <div className="error" style={{ marginBottom: '20px' }}>
            <strong>⚠️ Database Connection Required</strong>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              The backend cannot connect to the database. Please set up PostgreSQL and run migrations.
            </p>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>
              See <strong>SETUP.md</strong> or <strong>QUICK_START.md</strong> for instructions.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
            <p>No tests available. Set up the database to see test listings.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <AnimatedBackground />
      
      {/* Spacer for fixed header */}
      <div style={{ height: isMobile ? '100px' : '130px' }} />
      
      <header style={{ 
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        padding: isMobile ? '20px 10px 20px 10px' : '40px 20px 40px 20px',
        color: 'white',
        textAlign: 'center',
      }}>
        <div className="container">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              marginBottom: isMobile ? '16px' : '20px',
              marginLeft: isMobile ? '0' : '-60px',
            }}
          >
            <Logo size={isMobile ? 60 : 80} animated={true} showText={true} />
          </motion.div>
        </div>
      </header>

      {/* Mystery Invite Section */}
      <section id="mystery-invite">
        <img 
          src="/icons/Lookmagic.svg" 
          alt="Mystery Icon" 
          className="lookmagic-icon"
          onClick={() => {
            const testsSection = document.getElementById('tests-section');
            if (testsSection) {
              testsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{ cursor: 'pointer' }}
        />
        <h2 
          className="mystery-text"
          onClick={() => {
            const ctaCard = document.getElementById('cta-test-card');
            if (ctaCard) {
              ctaCard.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          You should see what's inside of you!
        </h2>
      </section>

      <main className="container" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
        {/* Developer Control Panel - TEMPORARY */}
        <DeveloperControlPanel />

        {/* Stats */}
        <StatsSection />

        {/* Tests Completed Today */}
        <TestsCompletedCounter />

        {/* Test Cards - 3 cards in a row (IQ, Personality) */}
        {(() => {
          const iqTestConfig = getTestConfig('iqtest');
          const personalityTestConfig = getTestConfig('personality');
          
          if (!iqTestConfig || !personalityTestConfig) return null;
          
          return (
            <motion.div
              id="cta-test-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '20px' : '10px',
                maxWidth: 'none',
                margin: '0 auto',
                marginTop: isMobile ? '15vh' : 'clamp(500px, 25vh, 600px)',
                marginBottom: isMobile ? '48px' : '64px',
                padding: isMobile ? '0 20px' : '0 20px',
              }}
            >
              <TestCard test={iqTestConfig} index={0} />
              <TestCard test={personalityTestConfig} index={1} />
            </motion.div>
          );
        })()}

        {/* Discover Your Mind Card */}
        <DiscoverYourMindCard />

        {/* Category Sections */}
        <CategorySection />

        {/* Testler Section - API'den gelen testler için TestCard kullan */}
        <div 
          id="tests-section"
          style={{ 
            marginTop: isMobile ? '10vh' : 'clamp(300px, 20vh, 400px)',
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gap: isMobile ? '20px' : '32px' 
          }}
        >
          {tests
            .filter(test => test.slug !== 'iqtest' && test.slug !== 'personality')
            .map((test, idx) => {
              // Test-config.json'dan config bul
              const testConfig = getTestConfig(test.slug);
              
              // Eğer config bulunduysa TestCard kullan
              if (testConfig) {
                return <TestCard key={test.id} test={testConfig} index={idx} />;
              }
              
              // Config bulunamadıysa, bu test muhtemelen API'den geliyor ve henüz test-config.json'da yok
              // Bu durumda varsayılan bir config oluştur veya null döndür
              return null;
            })}
        </div>

        {tests.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px', 
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '16px',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ 
              color: '#555', 
              fontSize: '18px',
              fontWeight: '500'
            }}>
              No tests available at the moment.
            </p>
          </div>
        )}

        {/* Developer Result Shortcuts - Only visible in development */}
        {((import.meta as any).env?.DEV || (import.meta as any).env?.MODE === 'development') && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              marginTop: '64px',
              padding: isMobile ? '24px' : '32px',
              borderRadius: '16px',
              background: 'linear-gradient(180deg, #faf8ff, #ffffff)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px dashed rgba(108, 99, 255, 0.3)',
            }}
          >
            <h3 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              color: '#6C63FF',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              🧠 Developer Result Shortcuts
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}>
              {/* Dynamic Developer Shortcuts - Generated from testConfigs */}
              {testConfigs
                .filter(test => test.id !== 'iqtest' && test.id !== 'personality')
                .map((test, index) => {
                  const language = i18n.language as 'en' | 'tr';
                  const testName = test.name[language] || test.name.en;
                  const primaryColor = test.colors.primary;
                  
                  // Calculate hover color (slightly darker)
                  const hexToRgb = (hex: string) => {
                    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                    } : null;
                  };
                  
                  const rgb = hexToRgb(primaryColor);
                  const hoverColor = rgb 
                    ? `rgb(${Math.max(0, rgb.r - 20)}, ${Math.max(0, rgb.g - 20)}, ${Math.max(0, rgb.b - 20)})`
                    : primaryColor;
                  
                  return (
                    <motion.div
                      key={test.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: `1px solid ${test.colors.cardBorder}`,
                      }}
                    >
                      <h4 style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#444',
                      }}>
                        {testName}
                      </h4>
                      <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                      }}>
                        {(['excellent', 'good', 'developing'] as const).map((level) => (
                          <li key={level} style={{ margin: '8px 0' }}>
                            <a
                              href={`/test/${test.slug}/unlock/${level}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: 'none',
                                color: primaryColor,
                                fontWeight: '500',
                                fontSize: '14px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = hoverColor;
                                e.currentTarget.style.background = `${primaryColor}1A`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = primaryColor;
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                              <span style={{ fontSize: '12px', opacity: 0.7 }}>↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}

export default Home;
