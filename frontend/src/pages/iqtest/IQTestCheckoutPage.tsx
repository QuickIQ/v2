import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { useTestsCompletedCounter } from '../../hooks/useTestsCompletedCounter';
import { getTestConfig } from '../../utils/testContentLoader';
import { PaymentFooter } from '../../components/TestFlow/PaymentComponents/PaymentFooter';
import { SocialProof } from '../../components/TestFlow/PaymentComponents/SocialProof';
import { Features } from '../../components/TestFlow/PaymentComponents/Features';
import { RecentResults } from '../../components/TestFlow/PaymentComponents/RecentResults';
import { AIAuroraCard } from '../../components/TestFlow/PaymentComponents/AIAuroraCard';
import { GrowingMind } from '../../components/TestFlow/PaymentComponents/GrowingMind';
import { PaymentForm } from '../../components/TestFlow/PaymentComponents/PaymentForm';
import { TrustPoints } from '../../components/TestFlow/PaymentComponents/TrustPoints';
import { TrustedWorldwide } from '../../components/TestFlow/PaymentComponents/TrustedWorldwide';
import paymentPageContent from '../../data/shared/payment-page-content.json';
import '../../App.css';

// Inner component (same structure as UniversalPaymentPageContent)
function IQTestCheckoutPageContent() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  
  // For IQ test, get resultLevel from sessionStorage score
  const score = sessionStorage.getItem('iqtest_score');
  let resultLevel: 'excellent' | 'good' | 'developing' | null = null;
  let resultData: any = null;
  
  if (score) {
    const scoreNum = Number(score);
    if (scoreNum >= 140 && scoreNum <= 145) resultLevel = 'excellent';
    else if (scoreNum >= 125 && scoreNum <= 139) resultLevel = 'excellent';
    else if (scoreNum >= 110 && scoreNum <= 124) resultLevel = 'good';
    else if (scoreNum >= 95 && scoreNum <= 109) resultLevel = 'good';
    else resultLevel = 'developing';
  }
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Get language code
  const language = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  // Get test config for dynamic content
  const testId = 'iqtest';
  const testConfig = getTestConfig(testId);
  const testName = testConfig?.name?.[language] || testConfig?.name?.en || testId;
  
  const discoverCardContent = paymentPageContent.discoverCard;
  const { count: testCount, formattedCount } = useTestsCompletedCounter();

  const handlePaymentError = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '100px' : '120px',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* AI Aurora Payment Card */}
        <ScrollRevealCard>
          <AIAuroraCard language={language} />
        </ScrollRevealCard>

        {/* The Growing Mind Section */}
        <ScrollRevealCard delay={0.1}>
          <GrowingMind
            language={language}
            testName={testName}
            resultLevel={resultLevel}
            resultData={resultData}
          />
        </ScrollRevealCard>


        {/* Top Section */}
        <ScrollRevealCard delay={0.2}>
          <motion.div
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '32px' : '48px',
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
        </ScrollRevealCard>

        {/* Social Proof Section (Why Trust + Reviews) */}
        <ScrollRevealCard delay={0.3}>
          <SocialProof testId={testId} />
        </ScrollRevealCard>

        {/* Recent Results Section */}
        <ScrollRevealCard delay={0.4}>
          <RecentResults testId={testId} />
        </ScrollRevealCard>

        {/* Payment Options Section */}
        <ScrollRevealCard delay={0.5}>
          <div id="payment-section" style={{ marginTop: '40px', scrollMarginTop: '100px' }}>
            {/* Divider with text */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: isMobile ? '32px' : '40px',
              }}
            >
              {/* Discover Your Mind Card */}
              <motion.div
                whileHover={isMobile ? {} : {
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
                style={{
                  width: '100%',
                  marginBottom: isMobile ? '24px' : '32px',
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
                  {discoverCardContent.text[language] || discoverCardContent.text.en}
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          {/* 3-Column Layout: Trust | Payment | Quick Facts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '280px 1fr 280px',
            gap: isMobile ? '32px' : '32px',
            maxWidth: isMobile ? '100%' : '1400px',
            margin: '0 auto 48px',
            alignItems: 'start',
          }}>
            {/* LEFT COLUMN: Why Trust QuickIQ? */}
            <div
              style={{
                maxWidth: isMobile ? '100%' : '280px',
                order: isMobile ? 1 : 1,
              }}
            >
              <ScrollRevealCard delay={0.6}>
                <TrustPoints language={language} />
              </ScrollRevealCard>
            </div>

            {/* CENTER COLUMN: Payment Form */}
            <div style={{
              order: isMobile ? 2 : 2,
            }}>
              <ScrollRevealCard delay={0.7}>
                <PaymentForm
                  language={language}
                  testId={testId}
                  resultLevel={resultLevel}
                  onError={handlePaymentError}
                  onSuccess={() => {
                    // Navigate to results with score
                    const score = sessionStorage.getItem('iqtest_score');
                    if (score) {
                      navigate(`/test/iqtest/results?score=${score}`);
                    }
                  }}
                />
              </ScrollRevealCard>
            </div>

            {/* RIGHT COLUMN: Trusted Worldwide */}
            <div
              style={{
                maxWidth: isMobile ? '100%' : '280px',
                order: isMobile ? 3 : 3,
              }}
            >
              <ScrollRevealCard delay={0.8}>
                <TrustedWorldwide language={language} />
              </ScrollRevealCard>
            </div>
          </div>
        </div>
        </ScrollRevealCard>

        {/* Features Section */}
        <ScrollRevealCard delay={0.9}>
          <Features testId={testId} />
        </ScrollRevealCard>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#e74c3c',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(231, 76, 60, 0.4)',
              zIndex: 10000,
              maxWidth: '90%',
              textAlign: 'center',
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <PaymentFooter testId={testId} />
    </main>
  );
}

// Scroll reveal component for cards
function ScrollRevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView && !visible) {
      requestAnimationFrame(() => {
        setVisible(true);
      });
    }
  }, [isInView, visible]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Main component
export default function IQTestCheckoutPage() {
  // Scroll and header are active - no scrollbar hiding
  return <IQTestCheckoutPageContent />;
}
