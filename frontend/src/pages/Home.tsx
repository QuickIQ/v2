import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { testApi } from '../services/api';
import { Test } from '../types';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Logo } from '../components/ui/Logo';
import { useMobile } from '../hooks/useMobile';
import { getAllTestConfigs, getTestConfig } from '../utils/testContentLoader';
import { StatsSection } from '../components/ui/StatsSection';
import { TestsCompletedCounter } from '../components/ui/TestsCompletedCounter';
import { CategoryStarLayout } from '../components/ui/CategoryStarLayout';
import { TestCard } from '../components/ui/TestCard';
import { DiscoverYourMindCard } from '../components/ui/DiscoverYourMindCard';
import { DeveloperControlPanel } from '../components/ui/DeveloperControlPanel';
// Category test components - only mount when selected
import { BusinessTests } from '../components/categories/BusinessTests';
import { HealthTests } from '../components/categories/HealthTests';
import { LoveTests } from '../components/categories/LoveTests';
import { MoneyTests } from '../components/categories/MoneyTests';
import { DarkTests } from '../components/categories/DarkTests';
import '../App.css';

function Home() {
  const { t, i18n } = useTranslation();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Category selection state
  const [showDeveloperShortcuts, setShowDeveloperShortcuts] = useState(false); // Toggle for developer shortcuts
  const [showDeveloperControlPanel, setShowDeveloperControlPanel] = useState(false); // Toggle for developer control panel
  const isMobile = useMobile();
  const categoryRef = useRef<HTMLDivElement>(null); // Ref for scrolling to tests section
  
  // Cache test configs - sadece bir kere hesapla
  const testConfigs = useMemo(() => getAllTestConfigs(), []);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await testApi.getAll('en');
        
        // Get IQ and Personality test configs from test-config.json
        const iqTestConfig = getTestConfig('iqtest');
        const personalityTestConfig = getTestConfig('personality');
        
        // Convert configs to Test objects for API compatibility
        const specialTests: Test[] = [];
        
        if (iqTestConfig && iqTestConfig.name && iqTestConfig.slug && iqTestConfig.category) {
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
        
        if (personalityTestConfig && personalityTestConfig.name && personalityTestConfig.slug && personalityTestConfig.category) {
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

  // Category selection handler - memoized to prevent re-renders
  // Toggle behavior: if same category is clicked again, close it (set to null)
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  }, []);

  // Auto-scroll to tests section when category is selected
  useEffect(() => {
    if (selectedCategory && categoryRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        categoryRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 200);
    }
  }, [selectedCategory]);

  // Listen for category selection from Header
  useEffect(() => {
    const handleCategorySelectEvent = (event: CustomEvent) => {
      const categoryId = event.detail?.categoryId;
      if (categoryId && ['business', 'health', 'love', 'money', 'dark'].includes(categoryId)) {
        handleCategorySelect(categoryId);
      }
    };

    window.addEventListener('selectCategory', handleCategorySelectEvent as EventListener);
    return () => {
      window.removeEventListener('selectCategory', handleCategorySelectEvent as EventListener);
    };
  }, [handleCategorySelect]);
  
  // Render selected category component - UNMOUNT others for performance
  const renderCategoryTests = () => {
    if (!selectedCategory) return null;
    
    switch (selectedCategory) {
      case 'business':
        return <BusinessTests />;
      case 'health':
        return <HealthTests />;
      case 'love':
        return <LoveTests />;
      case 'money':
        return <MoneyTests />;
      case 'dark':
        return <DarkTests />;
      default:
        return null;
    }
  };

  // Cache IQ and Personality test configs - component seviyesinde hook olarak
  const iqTestConfig = useMemo(() => getTestConfig('iqtest') || undefined, []);
  const personalityTestConfig = useMemo(() => getTestConfig('personality') || undefined, []);

  // Cache developer shortcuts - component seviyesinde hook olarak
  const developerShortcuts = useMemo(() => {
    return testConfigs
      .filter(test => test && test.id && test.id !== 'iqtest' && test.id !== 'personality' && test.colors);
  }, [testConfigs]);

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
          <div
            className="logo-container-fade-in"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              marginBottom: isMobile ? '16px' : '20px',
              marginLeft: isMobile ? '0' : '-60px',
            }}
          >
            <Logo size={isMobile ? 60 : 80} animated={true} showText={true} />
          </div>
        </div>
      </header>

      <main style={{ paddingTop: isMobile ? '10px' : '16px', paddingBottom: '80px', position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        {/* Category Star Layout - Pentagon/5-point star with Lookmagic at center */}
        <CategoryStarLayout 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />

        {/* Tests Completed Today */}
        <TestsCompletedCounter />

        {/* Stats */}
        <StatsSection />

        {/* Test Cards - IQ and Personality side by side */}
        {iqTestConfig && personalityTestConfig && (
          <div
            className="test-cards-container-fade-in"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile 
                ? 'repeat(2, minmax(0, 1fr))' 
                : 'repeat(2, minmax(0, 1fr))',
              gridAutoRows: '1fr',
              gap: isMobile ? '12px' : '10px',
              maxWidth: 'none',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: isMobile ? '32px' : '48px',
              marginBottom: isMobile ? '48px' : '64px',
              padding: isMobile ? '0' : '0',
              alignItems: 'stretch',
              justifyItems: 'stretch',
            }}
          >
            <div id="iq-test-section">
              <TestCard test={iqTestConfig} index={0} />
            </div>
            <div id="personality-test-section">
              <TestCard test={personalityTestConfig} index={1} />
            </div>
          </div>
        )}

        {/* Discover Your Mind Card */}
        <DiscoverYourMindCard />

        {/* Selected Category Tests - ONLY renders when category is selected, others UNMOUNTED */}
        <div ref={categoryRef} data-category-section>
          {renderCategoryTests()}
        </div>

        {/* Developer Result Shortcuts - Only visible in development */}
        {((import.meta as any).env?.DEV || (import.meta as any).env?.MODE === 'development') && (
          <div style={{ marginTop: '64px' }}>
            {/* Toggle Button */}
            <button
              onClick={() => setShowDeveloperShortcuts(prev => !prev)}
              style={{
                width: '100%',
                padding: isMobile ? '16px 20px' : '20px 24px',
                borderRadius: '12px',
                background: showDeveloperShortcuts 
                  ? 'linear-gradient(135deg, #6C63FF 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: `2px solid ${showDeveloperShortcuts ? '#6C63FF' : 'rgba(108, 99, 255, 0.3)'}`,
                color: showDeveloperShortcuts ? '#FFFFFF' : '#6C63FF',
                fontWeight: '600',
                fontSize: isMobile ? '14px' : '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: showDeveloperShortcuts 
                  ? '0 4px 12px rgba(108, 99, 255, 0.3)'
                  : '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
              onMouseEnter={(e) => {
                if (!isMobile && !showDeveloperShortcuts) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && !showDeveloperShortcuts) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.3)';
                }
              }}
            >
              <span>🧠</span>
              <span>Developer Result Shortcuts</span>
              <span style={{ 
                fontSize: '12px',
                transition: 'transform 0.3s ease',
                transform: showDeveloperShortcuts ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▼
              </span>
            </button>

            {/* Content - Only shown when toggled */}
            {showDeveloperShortcuts && (
              <section
                className="developer-shortcuts-fade-in"
                style={{
                  marginTop: '24px',
                  padding: isMobile ? '24px' : '32px',
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, #faf8ff, #ffffff)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px dashed rgba(108, 99, 255, 0.3)',
                }}
              >
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}>
              {/* Dynamic Developer Shortcuts - Generated from testConfigs */}
              {developerShortcuts.map((test, index) => {
                  if (!test || !test.id || !test.name || !test.colors || !test.slug) return null;
                  
                  const language = i18n.language as 'en' | 'tr';
                  const testName = test.name[language] || test.name.en;
                  const primaryColor = test.colors.primary;
                  
                  return (
                    <div
                      key={test.id}
                      className="developer-shortcut-card-fade-in"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '12px',
                        padding: '20px',
                        border: `1px solid ${test.colors.cardBorder}`,
                        animationDelay: `${index * 0.05}s`,
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
                              className="developer-shortcut-link"
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
                                '--link-color': primaryColor,
                              } as React.CSSProperties}
                            >
                              {level.charAt(0).toUpperCase() + level.slice(1)}
                              <span style={{ fontSize: '12px', opacity: 0.7 }}>↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </section>
            )}
          </div>
        )}

        {/* Developer Control Panel - Only visible in development */}
        {((import.meta as any).env?.DEV || (import.meta as any).env?.MODE === 'development') && (
          <div style={{ marginTop: '64px' }}>
            {/* Toggle Button */}
            <button
              onClick={() => setShowDeveloperControlPanel(prev => !prev)}
              style={{
                width: '100%',
                padding: isMobile ? '16px 20px' : '20px 24px',
                borderRadius: '12px',
                background: showDeveloperControlPanel 
                  ? 'linear-gradient(135deg, #6C63FF 0%, #8B5CF6 100%)'
                  : 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                border: `2px solid ${showDeveloperControlPanel ? '#6C63FF' : 'rgba(108, 99, 255, 0.3)'}`,
                color: showDeveloperControlPanel ? '#FFFFFF' : '#6C63FF',
                fontWeight: '600',
                fontSize: isMobile ? '14px' : '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: showDeveloperControlPanel 
                  ? '0 4px 12px rgba(108, 99, 255, 0.3)'
                  : '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
              onMouseEnter={(e) => {
                if (!isMobile && !showDeveloperControlPanel) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile && !showDeveloperControlPanel) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)';
                  e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.3)';
                }
              }}
            >
              <span>⚙️</span>
              <span>Personality Unlock Pages Control Panel</span>
              <span style={{ 
                fontSize: '12px',
                transition: 'transform 0.3s ease',
                transform: showDeveloperControlPanel ? 'rotate(180deg)' : 'rotate(0deg)',
              }}>
                ▼
              </span>
            </button>

            {/* Content - Only shown when toggled */}
            {showDeveloperControlPanel && (
              <div style={{ marginTop: '24px' }}>
                <DeveloperControlPanel />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
