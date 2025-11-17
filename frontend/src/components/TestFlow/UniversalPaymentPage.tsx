import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import { useTestsCompletedCounter } from '../../hooks/useTestsCompletedCounter';
import { getTestConfig } from '../../utils/testContentLoader';
import { useTestStore } from '../../hooks/useTestStore';
import { PaymentFooter } from './PaymentComponents/PaymentFooter';
import { SocialProof } from './PaymentComponents/SocialProof';
import { Features } from './PaymentComponents/Features';
import { RecentResults } from './PaymentComponents/RecentResults';
import { AIAuroraCard } from './PaymentComponents/AIAuroraCard';
import { GrowingMind } from './PaymentComponents/GrowingMind';
import { PaymentForm } from './PaymentComponents/PaymentForm';
import { TrustPoints } from './PaymentComponents/TrustPoints';
import { TrustedWorldwide } from './PaymentComponents/TrustedWorldwide';
import paymentPageContent from '../../data/shared/payment-page-content.json';
import '../../App.css';

interface UniversalPaymentPageProps {
  testId?: string; // Optional, can be derived from URL
}

// RecentResults component is now imported from PaymentComponents

// Inner component that uses the store hook (called after store is loaded)
function UniversalPaymentPageContent({
  testId,
  useTestStoreHook,
}: {
  testId: string;
  useTestStoreHook: any;
}) {
  const { i18n } = useTranslation();
  const isMobile = useMobile();
  
  // Now safe to call useTestStoreHook hook - it's guaranteed to be loaded
  const { resultLevel, resultData } = useTestStoreHook();
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Get language code
  const language = (i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  
  // Get test config for dynamic content
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
        <AIAuroraCard language={language} />

        {/* The Growing Mind Section */}
        <GrowingMind
          language={language}
          testName={testName}
          resultLevel={resultLevel}
          resultData={resultData}
        />


        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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

        {/* Social Proof Section (Why Trust + Reviews) */}
        <SocialProof testId={testId} />

        {/* Recent Results Section */}
        <RecentResults testId={testId} />

        {/* Payment Options Section */}
        <div id="payment-section" style={{ marginTop: '40px', scrollMarginTop: '100px' }}>
          {/* Divider with text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '32px' : '40px',
            }}
          >
            {/* Discover Your Mind Card */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
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
          </motion.div>

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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                maxWidth: isMobile ? '100%' : '280px',
                order: isMobile ? 1 : 1,
              }}
            >
              <TrustPoints language={language} />
            </motion.div>

            {/* CENTER COLUMN: Payment Form */}
            <div style={{
              order: isMobile ? 2 : 2,
            }}>
              <PaymentForm
                language={language}
                testId={testId}
                resultLevel={resultLevel}
                onError={handlePaymentError}
              />
            </div>

            {/* RIGHT COLUMN: Trusted Worldwide */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                maxWidth: isMobile ? '100%' : '280px',
                order: isMobile ? 3 : 3,
              }}
            >
              <TrustedWorldwide language={language} />
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <Features testId={testId} />
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

// Main component that loads store, then renders content component
export default function UniversalPaymentPage({ testId: testIdProp }: UniversalPaymentPageProps) {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Get testId from prop or derive from URL slug
  let testId = testIdProp || '';
  
  if (!testId) {
    // Extract slug from URL path (e.g., "/test/creative-thinking/payment" -> "creative-thinking")
    const pathMatch = location.pathname.match(/\/test\/([^/]+)/);
    if (pathMatch) {
      const slug = pathMatch[1];
      const testConfig = getTestConfig(slug);
      testId = testConfig?.id || slug;
    }
  }
  
  // Early return if testId is still missing
  if (!testId) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
        padding: '40px',
      }}>
        <div className="error" style={{ textAlign: 'center' }}>
          <h2>Test Not Found</h2>
          <p>Unable to identify test from URL: {location.pathname}</p>
        </div>
      </div>
    );
  }
  
  // Load store dynamically using hook
  const { useTestStore: useTestStoreHook, loading: storeLoading, error: storeError } = useTestStore(testId);
  
  // All conditional returns AFTER all hooks
  if (storeLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      }}>
        <div className="loading" style={{ fontSize: '18px', color: '#10b981' }}>
          {t('common.loading')}
        </div>
      </div>
    );
  }
  
  if (storeError || !useTestStoreHook) {
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
  
  // All data loaded, render content component (which will call useTestStoreHook hook)
  return (
    <UniversalPaymentPageContent
      testId={testId}
      useTestStoreHook={useTestStoreHook}
    />
  );
}
