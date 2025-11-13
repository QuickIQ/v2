import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { testApi } from '../services/api';
import { Test } from '../types';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Logo } from '../components/ui/Logo';
import { Brain, Clock, HelpCircle, TrendingUp, Users, Zap, Heart, Lock, Database, Lightbulb, Flower2 } from 'lucide-react';
import { useMobile } from '../hooks/useMobile';
import { useTestsCompletedCounter } from '../hooks/useTestsCompletedCounter';
import { usePersonalityTestStore } from '../store/personalityTestStore';
import '../App.css';

function Home() {
  const { t, i18n } = useTranslation();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMobile();
  const { count: testCount, formattedCount } = useTestsCompletedCounter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await testApi.getAll('en');
        
        // Add IQ Test card
        const iqTest: Test = {
          id: 999999, // Temporary ID for IQ test
          name: 'IQ Test',
          slug: 'iqtest',
          category: 'Intelligence',
          enabled: true,
          default_language: 'en',
          is_premium: false,
          price_cents: 0,
          test_type: 'iq',
          translated_name: 'IQ Test',
        };
        
        // Add Personality Test card
        const personalityTest: Test = {
          id: 999998, // Temporary ID for personality test
          name: 'Personality Test',
          slug: 'personality',
          category: 'Personality',
          enabled: true,
          default_language: 'en',
          is_premium: false,
          price_cents: 0,
          test_type: 'personality',
          translated_name: 'Personality Test',
        };
        
        setTests([iqTest, personalityTest, ...data]);
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '32px',
            marginBottom: isMobile ? '32px' : '48px',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '12px',
              fontWeight: '700',
              color: 'white',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}>
              🔧 Developer Only
            </div>
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: 'white',
              margin: 0,
            }}>
              Personality Unlock Pages Control Panel
            </h2>
          </div>
          <p style={{
            fontSize: isMobile ? '13px' : '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '24px',
            lineHeight: '1.6',
          }}>
            Click any personality type below to view its unlock page. This panel will be removed before production.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: '12px',
          }}>
            {[
              { type: 'INFP', name: 'Mediator', emoji: '🌸' },
              { type: 'ENFP', name: 'Campaigner', emoji: '🔥' },
              { type: 'INFJ', name: 'Advocate', emoji: '🌙' },
              { type: 'ENFJ', name: 'Protagonist', emoji: '🌻' },
              { type: 'INTJ', name: 'Architect', emoji: '🧠' },
              { type: 'ENTJ', name: 'Commander', emoji: '⚔️' },
              { type: 'INTP', name: 'Logician', emoji: '💭' },
              { type: 'ENTP', name: 'Debater', emoji: '⚡' },
              { type: 'ISFP', name: 'Adventurer', emoji: '🎨' },
              { type: 'ESFP', name: 'Entertainer', emoji: '💃' },
              { type: 'ISFJ', name: 'Defender', emoji: '🌿' },
              { type: 'ESFJ', name: 'Consul', emoji: '🤝' },
              { type: 'ISTP', name: 'Virtuoso', emoji: '🛠️' },
              { type: 'ESTP', name: 'Entrepreneur', emoji: '🚀' },
              { type: 'ISTJ', name: 'Logistician', emoji: '📘' },
              { type: 'ESTJ', name: 'Executive', emoji: '🧩' },
            ].map((personality) => (
              <Link
                key={personality.type}
                to={`/test/personality/unlock?type=${personality.type}`}
                onClick={() => {
                  // Set personality type in localStorage for UnlockPage to read
                  localStorage.setItem('personality_result', JSON.stringify({
                    typeCode: personality.type,
                    typeName: personality.name,
                  }));
                  // Also set in Zustand store
                  usePersonalityTestStore.getState().setPersonalityType(personality.type);
                }}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    padding: isMobile ? '16px 12px' : '20px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div style={{
                    fontSize: isMobile ? '24px' : '32px',
                    marginBottom: '8px',
                  }}>
                    {personality.emoji}
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    marginBottom: '4px',
                  }}>
                    {personality.type}
                  </div>
                  <div style={{
                    fontSize: isMobile ? '11px' : '12px',
                    color: '#666',
                    fontWeight: '500',
                  }}>
                    {personality.name}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '12px' : '24px',
            marginBottom: isMobile ? '32px' : '48px',
            flexWrap: 'wrap'
          }}
        >
          {[
            { icon: Users, value: '100K+', label: 'Aktif Kullanıcı' },
            { icon: Brain, value: '40+', label: 'Farklı Test' },
            { icon: TrendingUp, value: '98%', label: 'Memnuniyet' },
            { icon: Zap, value: '10dk', label: 'Ortalama Süre' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                textAlign: 'center',
                padding: isMobile ? '20px 16px' : '28px 24px',
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: isMobile ? '16px' : '20px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
                minWidth: isMobile ? '140px' : '180px',
                flex: isMobile ? '1 1 calc(50% - 6px)' : 'none',
                maxWidth: isMobile ? 'calc(50% - 6px)' : 'none',
                border: '1px solid rgba(255,255,255,0.8)',
                transition: 'all 0.3s ease',
              }}
            >
              <stat.icon 
                size={isMobile ? 32 : 40} 
                style={{ 
                  marginBottom: isMobile ? '12px' : '16px',
                  color: '#667eea',
                  opacity: 0.9,
                }} 
              />
              <div style={{ 
                fontSize: isMobile ? '28px' : '36px', 
                fontWeight: '700', 
                marginBottom: isMobile ? '8px' : '10px',
                color: '#1a1a1a',
                letterSpacing: '-0.5px',
                lineHeight: '1.2',
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: isMobile ? '12px' : '14px', 
                color: '#666',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                marginTop: '6px',
                opacity: 0.9,
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tests Completed Today */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '32px' : '48px',
            padding: isMobile ? '0 20px' : '0',
          }}
        >
          <motion.p
            key={testCount}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: isMobile ? '20px' : '24px',
              color: '#888',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              flexWrap: 'wrap',
              margin: 0,
            }}
          >
            {i18n.language === 'tr' ? (
              <>
                <span>Bugün</span>
                <motion.span
                  key={testCount}
                  initial={{ scale: 1.3, y: -5 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.5
                  }}
                  style={{
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: isMobile ? '22px' : '26px',
                  }}
                >
                  {formattedCount}
                </motion.span>
                <span>test tamamlandı!</span>
              </>
            ) : (
              <>
                <span>Today</span>
                <motion.span
                  key={testCount}
                  initial={{ scale: 1.3, y: -5 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    duration: 0.5
                  }}
                  style={{
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: isMobile ? '22px' : '26px',
                  }}
                >
                  {formattedCount}
                </motion.span>
                <span>test's completed!</span>
              </>
            )}
          </motion.p>
        </motion.div>

        {/* Test Cards - 3 cards in a row */}
        {tests.find(test => test.slug === 'iqtest') && tests.find(test => test.slug === 'personality') && (() => {
          const iqTest = tests.find(test => test.slug === 'iqtest')!;
          const personalityTest = tests.find(test => test.slug === 'personality')!;
          return (
            <motion.div
              id="cta-test-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '20px' : '10px',
                maxWidth: 'none',
                margin: '0 auto',
                marginTop: isMobile ? '15vh' : 'clamp(500px, 25vh, 600px)',
                marginBottom: isMobile ? '48px' : '64px',
                padding: isMobile ? '0 20px' : '0 20px',
              }}
            >
              {/* IQ Test Card */}
              <Link
                to="/test/iqtest"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', aspectRatio: '1.295' }}
              >
                <motion.div
                  className="iq-test-card"
                  style={{
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
                    borderRadius: isMobile ? '16px' : '24px',
                    padding: isMobile ? '24px' : '32px',
                    border: '2px solid rgba(108, 99, 255, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    boxShadow: '0 24px 60px rgba(108, 99, 255, 0.35), 0 0 0 1px rgba(108, 99, 255, 0.25), 0 0 80px rgba(155, 201, 237, 0.3)',
                    borderColor: 'rgba(108, 99, 255, 0.4)',
                  }}
                >
                  {/* Glow Effect Background */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(108, 99, 255, 0.18) 0%, transparent 70%)',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.15s ease',
                    }}
                    transition={{ duration: 0.15 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '22.8px' : '30.4px', 
                        marginBottom: isMobile ? '8px' : '12px', 
                        fontWeight: '700', 
                        color: '#1a1a1a',
                        background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '8px' : '12px',
                        flexWrap: 'wrap',
                      }}>
                        <motion.div
                          animate={{ 
                            rotate: [0, -5, 5, -5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'easeInOut'
                          }}
                        >
                          <Brain 
                            size={isMobile ? 28 : 36} 
                            style={{ 
                              color: '#6c63ff',
                              filter: 'drop-shadow(0 2px 8px rgba(108, 99, 255, 0.3))'
                            }} 
                          />
                        </motion.div>
                        {iqTest.translated_name || iqTest.name}
                      </h3>
                      <p style={{ 
                        color: '#666', 
                        fontSize: isMobile ? '14px' : '16px', 
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '6px' : '8px',
                        flexWrap: 'wrap',
                      }}>
                        <HelpCircle size={isMobile ? 16 : 18} style={{ color: '#667eea' }} />
                        <span>25 soru</span>
                        <span style={{ margin: '0 4px' }}>-</span>
                        <Clock size={isMobile ? 16 : 18} style={{ color: '#667eea' }} />
                        <span>15 dakika</span>
                      </p>
                    </div>

                    {/* Start Test Button Container */}
                    <div style={{ marginTop: 'auto', position: 'relative' }}>
                      {/* Background Button - Her zaman görünür */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                          borderRadius: '14px',
                          padding: '14px 26px',
                          opacity: 0.15,
                          zIndex: 0,
                          transition: 'opacity 0.15s ease',
                          width: 'fit-content',
                        }}
                        transition={{ duration: 0.15 }}
                        whileHover={{ opacity: 0.25 }}
                      />
                      
                      {/* Actual Button */}
                      <motion.div
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                          borderRadius: '14px',
                          padding: isMobile ? '12px 20px' : '14px 26px',
                          color: 'white',
                          fontWeight: '700',
                          fontSize: isMobile ? '16px' : '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 20px rgba(108, 99, 255, 0.3)',
                          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          cursor: 'pointer',
                          width: 'fit-content',
                          margin: '0 auto',
                        }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        whileHover={{
                          y: -8,
                          scale: 1.1,
                          boxShadow: '0 10px 35px rgba(108, 99, 255, 0.5), 0 0 50px rgba(155, 201, 237, 0.4), 0 0 70px rgba(108, 99, 255, 0.3)',
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Start Test</span>
                        <motion.span
                          animate={{ x: [0, 6, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ fontSize: '20px' }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Personality Test Card */}
              <Link
                to="/test/personality"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', aspectRatio: '1.295' }}
              >
                <motion.div
                  className="personality-test-card"
                  style={{
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #ffffff 0%, #fff5f8 100%)',
                    borderRadius: isMobile ? '16px' : '24px',
                    padding: isMobile ? '24px' : '32px',
                    border: '2px solid rgba(236, 72, 153, 0.15)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    boxShadow: '0 24px 60px rgba(236, 72, 153, 0.35), 0 0 0 1px rgba(236, 72, 153, 0.25), 0 0 80px rgba(251, 146, 60, 0.3)',
                    borderColor: 'rgba(236, 72, 153, 0.4)',
                  }}
                >
                  {/* Glow Effect Background */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.15s ease',
                    }}
                    transition={{ duration: 0.15 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '22.8px' : '30.4px', 
                        marginBottom: isMobile ? '8px' : '12px', 
                        fontWeight: '700', 
                        color: '#1a1a1a',
                        background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '8px' : '12px',
                        flexWrap: 'wrap',
                      }}>
                        <motion.div
                          animate={{ 
                            rotate: [0, 5, -5, 5, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'easeInOut'
                          }}
                        >
                          <Heart 
                            size={isMobile ? 28 : 36} 
                            style={{ 
                              color: '#ec4899',
                              filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.3))',
                              fill: 'rgba(236, 72, 153, 0.2)'
                            }} 
                          />
                        </motion.div>
                        {personalityTest.translated_name || personalityTest.name}
                      </h3>
                      <p style={{ 
                        color: '#666', 
                        fontSize: isMobile ? '14px' : '16px', 
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: isMobile ? '6px' : '8px',
                        flexWrap: 'wrap',
                      }}>
                        <HelpCircle size={isMobile ? 16 : 18} style={{ color: '#ec4899' }} />
                        <span>30 soru</span>
                        <span style={{ margin: '0 4px' }}>-</span>
                        <Clock size={isMobile ? 16 : 18} style={{ color: '#ec4899' }} />
                        <span>15 dakika</span>
                      </p>
                    </div>

                    {/* Start Test Button Container */}
                    <div style={{ marginTop: 'auto', position: 'relative' }}>
                      {/* Background Button */}
                      <motion.div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
                          borderRadius: '14px',
                          padding: '14px 26px',
                          opacity: 0.15,
                          zIndex: 0,
                          transition: 'opacity 0.15s ease',
                          width: 'fit-content',
                        }}
                        transition={{ duration: 0.15 }}
                        whileHover={{ opacity: 0.25 }}
                      />
                      
                      {/* Actual Button */}
                      <motion.div
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
                          borderRadius: '14px',
                          padding: isMobile ? '12px 20px' : '14px 26px',
                          color: 'white',
                          fontWeight: '700',
                          fontSize: isMobile ? '16px' : '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
                          transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          cursor: 'pointer',
                          width: 'fit-content',
                          margin: '0 auto',
                        }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        whileHover={{
                          y: -8,
                          scale: 1.1,
                          boxShadow: '0 10px 35px rgba(236, 72, 153, 0.5), 0 0 50px rgba(251, 146, 60, 0.4), 0 0 70px rgba(236, 72, 153, 0.3)',
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Start Test</span>
                        <motion.span
                          animate={{ x: [0, 6, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ fontSize: '20px' }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Memory Test Card - Coming Soon */}
              <motion.div
                className="memory-test-card"
                style={{
                  cursor: 'not-allowed',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                  borderRadius: isMobile ? '16px' : '24px',
                  padding: isMobile ? '24px' : '32px',
                  border: '2px solid rgba(59, 130, 246, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  width: '100%',
                  aspectRatio: '1.295',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: 0.8,
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
              >
                {/* Overlay for coming soon */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(2px)',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: isMobile ? '16px' : '24px',
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontWeight: '700',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  }}>
                    Open Soon
                  </div>
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '24px' : '32px', 
                      marginBottom: isMobile ? '8px' : '12px', 
                      fontWeight: '700', 
                      color: '#1a1a1a',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '8px' : '12px',
                      flexWrap: 'wrap',
                    }}>
                      <motion.div
                        animate={{ 
                          rotate: [0, -5, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: 'easeInOut'
                        }}
                      >
                        <Database 
                          size={isMobile ? 28 : 36} 
                          style={{ 
                            color: '#3b82f6',
                            filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3))'
                          }} 
                        />
                      </motion.div>
                      Memory Test
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      fontSize: isMobile ? '14px' : '16px', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '6px' : '8px',
                      flexWrap: 'wrap',
                    }}>
                      <HelpCircle size={isMobile ? 16 : 18} style={{ color: '#3b82f6' }} />
                      <span>Coming soon</span>
                    </p>
                  </div>

                  {/* Locked Button */}
                  <div style={{ marginTop: 'auto', position: 'relative' }}>
                    <motion.div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        background: 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)',
                        borderRadius: '14px',
                        padding: isMobile ? '12px 20px' : '14px 26px',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: isMobile ? '16px' : '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 20px rgba(148, 163, 184, 0.3)',
                        cursor: 'not-allowed',
                        width: 'fit-content',
                        margin: '0 auto',
                      }}
                    >
                      <Lock size={18} />
                      <span>Coming Soon</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}

        {/* Discover Your Mind Card */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          whileHover={{
            scale: 1.02,
            y: -4,
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
          style={{
            width: '100%',
            marginBottom: isMobile ? '24px' : '32px',
            marginTop: isMobile ? '32px' : '48px',
            padding: isMobile ? '0 20px' : '0',
          }}
        >
          <motion.div
            animate={{
              background: [
                'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
                'linear-gradient(135deg, rgba(139, 92, 246, 0.18) 0%, rgba(108, 99, 255, 0.15) 50%, rgba(155, 201, 237, 0.15) 100%)',
                'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
              ],
              boxShadow: [
                '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
                '0 12px 48px rgba(139, 92, 246, 0.3), 0 0 50px rgba(108, 99, 255, 0.25), inset 0 0 80px rgba(255, 255, 255, 0.15)',
                '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.15) 0%, rgba(155, 201, 237, 0.15) 50%, rgba(139, 92, 246, 0.12) 100%)',
              borderRadius: '24px',
              border: '2px solid rgba(108, 99, 255, 0.3)',
              padding: isMobile ? '28px 24px' : '36px 48px',
              boxShadow: '0 8px 32px rgba(108, 99, 255, 0.25), 0 0 40px rgba(155, 201, 237, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
          >
            {/* Animated rainbow shimmer */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '200%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.3) 10%, rgba(255, 165, 0, 0.3) 20%, rgba(255, 255, 0, 0.3) 30%, rgba(0, 255, 0, 0.3) 40%, rgba(0, 0, 255, 0.3) 50%, rgba(75, 0, 130, 0.3) 60%, rgba(238, 130, 238, 0.3) 70%, transparent 80%, transparent 100%)',
                pointerEvents: 'none',
                filter: 'blur(8px)',
              }}
            />
            
            {/* Decorative dots pattern */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '60px',
              height: '60px',
              background: 'radial-gradient(circle, rgba(108, 99, 255, 0.2) 2px, transparent 2px)',
              backgroundSize: '20px 20px',
              opacity: 0.3,
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '60px',
              height: '60px',
              background: 'radial-gradient(circle, rgba(155, 201, 237, 0.2) 2px, transparent 2px)',
              backgroundSize: '20px 20px',
              opacity: 0.3,
              pointerEvents: 'none',
            }} />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: '700',
                lineHeight: '1.5',
                margin: 0,
                background: 'linear-gradient(135deg, #6C63FF 0%, #9bc9ed 50%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 20px rgba(108, 99, 255, 0.3)',
                position: 'relative',
                zIndex: 1,
                letterSpacing: '0.3px',
              }}
            >
              Discover your mind, reveal your truth, unlock your potential, and transform yourself.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Zihinsel & Bilişsel Testler Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: isMobile ? '10vh' : 'clamp(300px, 20vh, 400px)',
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          {/* Category Header */}
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: isMobile ? '24px' : '32px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('home.categories.mental_cognitive') || 'Zihinsel & Bilişsel Testler'}
          </h2>

          {/* Creative Thinking Test Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '10px',
            maxWidth: 'none',
            margin: '0 auto',
            padding: isMobile ? '0 20px' : '0 20px',
          }}>
            <Link
              to="/test/creative-thinking"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', aspectRatio: '1.295' }}
            >
              <motion.div
                className="creative-thinking-test-card"
                style={{
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
                  borderRadius: isMobile ? '16px' : '24px',
                  padding: isMobile ? '24px' : '32px',
                  border: '2px solid rgba(108, 99, 255, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  boxShadow: '0 24px 60px rgba(108, 99, 255, 0.35), 0 0 0 1px rgba(108, 99, 255, 0.25), 0 0 80px rgba(155, 201, 237, 0.3)',
                  borderColor: 'rgba(108, 99, 255, 0.4)',
                }}
              >
                {/* Glow Effect Background */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(108, 99, 255, 0.18) 0%, transparent 70%)',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.15s ease',
                  }}
                  transition={{ duration: 0.15 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '22.8px' : '30.4px', 
                      marginBottom: isMobile ? '8px' : '12px', 
                      fontWeight: '700', 
                      color: '#1a1a1a',
                      background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '8px' : '12px',
                      flexWrap: 'wrap',
                    }}>
                      <motion.div
                        animate={{ 
                          rotate: [0, -5, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: 'easeInOut'
                        }}
                      >
                        <Lightbulb 
                          size={isMobile ? 28 : 36} 
                          style={{ 
                            color: '#FFD700',
                            filter: 'drop-shadow(0 2px 8px rgba(255, 215, 0, 0.4))'
                          }} 
                        />
                      </motion.div>
                      Creativity Test
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      fontSize: isMobile ? '14px' : '16px', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '6px' : '8px',
                      flexWrap: 'wrap',
                      marginBottom: '8px',
                    }}>
                      <HelpCircle size={isMobile ? 16 : 18} style={{ color: '#667eea' }} />
                      <span>20 soru</span>
                      <span style={{ margin: '0 4px' }}>-</span>
                      <Clock size={isMobile ? 16 : 18} style={{ color: '#667eea' }} />
                      <span>10 dakika</span>
                    </p>
                    <p style={{ 
                      color: '#666', 
                      fontSize: isMobile ? '14px' : '16px', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '6px' : '8px',
                      flexWrap: 'wrap',
                    }}>
                      yaratıcılığın sınırlarını ne kadar zorlayabiliyorsun?
                    </p>
                  </div>

                  {/* Start Test Button Container */}
                  <div style={{ marginTop: 'auto', position: 'relative' }}>
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                        borderRadius: '14px',
                        padding: '14px 26px',
                        opacity: 0.15,
                        zIndex: 0,
                        transition: 'opacity 0.15s ease',
                        width: 'fit-content',
                      }}
                      transition={{ duration: 0.15 }}
                      whileHover={{ opacity: 0.25 }}
                    />
                    
                    <motion.div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
                        borderRadius: '14px',
                        padding: isMobile ? '12px 20px' : '14px 26px',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: isMobile ? '16px' : '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 20px rgba(108, 99, 255, 0.3)',
                        transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: 'pointer',
                        width: 'fit-content',
                        margin: '0 auto',
                      }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      whileHover={{
                        y: -8,
                        scale: 1.1,
                        boxShadow: '0 10px 35px rgba(108, 99, 255, 0.5), 0 0 50px rgba(155, 201, 237, 0.4), 0 0 70px rgba(108, 99, 255, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Start Test</span>
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ fontSize: '20px' }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Depression Test Card */}
            <Link
              to="/test/depression"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', aspectRatio: '1.295' }}
            >
              <motion.div
                className="depression-test-card"
                style={{
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fff0f5 100%)',
                  borderRadius: isMobile ? '16px' : '24px',
                  padding: isMobile ? '24px' : '32px',
                  border: '2px solid rgba(255, 105, 180, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  boxShadow: '0 24px 60px rgba(255, 105, 180, 0.35), 0 0 0 1px rgba(255, 105, 180, 0.25), 0 0 80px rgba(255, 182, 193, 0.3)',
                  borderColor: 'rgba(255, 105, 180, 0.4)',
                }}
              >
                {/* Glow Effect Background */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255, 105, 180, 0.18) 0%, transparent 70%)',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.15s ease',
                  }}
                  transition={{ duration: 0.15 }}
                  whileHover={{ opacity: 1 }}
                />
                
                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '22.8px' : '30.4px', 
                      marginBottom: isMobile ? '8px' : '12px', 
                      fontWeight: '700', 
                      color: '#1a1a1a',
                      background: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '8px' : '12px',
                      flexWrap: 'wrap',
                    }}>
                      <motion.div
                        animate={{ 
                          rotate: [0, -5, 5, -5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: 'easeInOut'
                        }}
                      >
                        <Heart 
                          size={isMobile ? 28 : 36} 
                          style={{ 
                            color: '#FF69B4',
                            filter: 'drop-shadow(0 2px 8px rgba(255, 105, 180, 0.4))'
                          }} 
                        />
                      </motion.div>
                      Depression Test
                    </h3>
                    <p style={{ 
                      color: '#666', 
                      fontSize: isMobile ? '14px' : '16px', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '6px' : '8px',
                      flexWrap: 'wrap',
                      marginBottom: '8px',
                    }}>
                      <HelpCircle size={isMobile ? 16 : 18} style={{ color: '#ff69b4' }} />
                      <span>20 soru</span>
                      <span style={{ margin: '0 4px' }}>-</span>
                      <Clock size={isMobile ? 16 : 18} style={{ color: '#ff69b4' }} />
                      <span>10 dakika</span>
                    </p>
                    <p style={{ 
                      color: '#666', 
                      fontSize: isMobile ? '14px' : '16px', 
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: isMobile ? '6px' : '8px',
                      flexWrap: 'wrap',
                    }}>
                      Sadece yorgun musun, yoksa ruh halin sessizce mi çöküyor?
                    </p>
                  </div>

                  {/* Start Test Button Container */}
                  <div style={{ marginTop: 'auto', position: 'relative' }}>
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%)',
                        borderRadius: '14px',
                        padding: '14px 26px',
                        opacity: 0.15,
                        zIndex: 0,
                        transition: 'opacity 0.15s ease',
                        width: 'fit-content',
                      }}
                      transition={{ duration: 0.15 }}
                      whileHover={{ opacity: 0.25 }}
                    />
                    
                    <motion.div
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        background: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%)',
                        borderRadius: '14px',
                        padding: isMobile ? '12px 20px' : '14px 26px',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: isMobile ? '16px' : '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 20px rgba(255, 105, 180, 0.3)',
                        transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: 'pointer',
                        width: 'fit-content',
                        margin: '0 auto',
                      }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      whileHover={{
                        y: -8,
                        scale: 1.1,
                        boxShadow: '0 10px 35px rgba(255, 105, 180, 0.5), 0 0 50px rgba(255, 182, 193, 0.4), 0 0 70px rgba(255, 105, 180, 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Start Test</span>
                      <motion.span
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ fontSize: '20px' }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Testler Section */}
        <div 
          id="tests-section"
          style={{ 
            marginTop: isMobile ? '10vh' : 'clamp(300px, 20vh, 400px)',
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gap: isMobile ? '20px' : '32px' 
          }}
        >
          {tests.filter(test => test.slug !== 'iqtest' && test.slug !== 'personality').map((test, idx) => {
            // Normal Test Kartları
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Link
                  to={`/test/${test.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <motion.div
                    className="card"
                    style={{
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: isMobile ? '16px' : '24px',
                      padding: isMobile ? '20px' : '32px',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.1)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      width: '130%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    whileHover={{
                      boxShadow: '0 16px 48px rgba(102, 126, 234, 0.3)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: isMobile ? '20px' : '26px', marginBottom: '8px', fontWeight: '600', color: '#333', flex: 1 }}>
                        {test.translated_name || test.name}
                      </h3>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        style={{
                          background: test.is_premium 
                            ? 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
                            : 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}
                      >
                        {test.is_premium ? `$${(test.price_cents / 100).toFixed(2)}` : t('home.free')}
                      </motion.span>
                    </div>
                    {test.category && (
                      <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px', fontWeight: '500' }}>
                        📊 {test.category}
                      </p>
                    )}
                    <div style={{ 
                      color: '#667eea', 
                      fontWeight: '600', 
                      fontSize: '16px',
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {t('test.landing.startButton')}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
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
              {/* Creative Thinking Test */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(108, 99, 255, 0.15)',
                }}
              >
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#444',
                }}>
                  Creative Thinking Test
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}>
                  {(['excellent', 'good', 'developing'] as const).map((level) => (
                    <li key={level} style={{ margin: '8px 0' }}>
                      <a
                        href={`/test/creative-thinking/unlock/${level}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: 'none',
                          color: '#6C63FF',
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
                          e.currentTarget.style.color = '#5b56f0';
                          e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#6C63FF';
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

              {/* Depression Test */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(255, 105, 180, 0.15)',
                }}
              >
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#444',
                }}>
                  Depression Test
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}>
                  {(['excellent', 'good', 'developing'] as const).map((level) => (
                    <li key={level} style={{ margin: '8px 0' }}>
                      <a
                        href={`/test/depression/unlock/${level}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: 'none',
                          color: '#FF69B4',
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
                          e.currentTarget.style.color = '#ff5ba3';
                          e.currentTarget.style.background = 'rgba(255, 105, 180, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#FF69B4';
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

              {/* Personality Test - if you want to add it later */}
              {/* 
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid rgba(108, 99, 255, 0.15)',
                }}
              >
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#444',
                }}>
                  Personality Test
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}>
                  {(['excellent', 'good', 'developing'] as const).map((level) => (
                    <li key={level} style={{ margin: '8px 0' }}>
                      <Link
                        to={`/test/personality/unlock/${level}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: 'none',
                          color: '#6C63FF',
                          fontWeight: '500',
                          fontSize: '14px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease',
                          padding: '4px 8px',
                          borderRadius: '6px',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#5b56f0';
                          e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#6C63FF';
                          e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                        <span style={{ fontSize: '12px', opacity: 0.7 }}>↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              */}
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}

export default Home;

