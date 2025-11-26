import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMemo } from 'react';
import i18n from './i18n/config';
import { Header } from './components/layout/Header';
import Home from './pages/Home';
// Special test pages (not using universal system)
import IQTestPage from './pages/IQTestPage';
import PersonalityTestPage from './pages/PersonalityTestPage';
import PaymentPage from './tests/personality/PaymentPage';
import UnlockPage from './tests/personality/UnlockPage';
// Universal components
import { UniversalTestPage } from './utils/testPageFactory';
import UniversalPaymentPage from './components/TestFlow/UniversalPaymentPage';
import UniversalUnlockPage from './components/TestFlow/UniversalUnlockPage';
import UniversalAnalyzingPage from './components/TestFlow/UniversalAnalyzingPage';
import PersonalityEmailPage from './tests/personality/PersonalityEmailPage';
import IQTestCheckoutPage from './pages/iqtest/IQTestCheckoutPage';
import IQTestResultsPage from './pages/iqtest/results/IQTestResultsPage';
// Utils
import { getAllTestConfigs } from './utils/testContentLoader';
import { useDynamicTestTranslations } from './hooks/useDynamicTestTranslations';
import './App.css';

// IQ Test Analyzing Page wrapper
function IQTestAnalyzingPage() {
  const navigate = useNavigate();
  return (
    <UniversalAnalyzingPage 
      testId="iqtest" 
      onComplete={() => {
        // Score is already stored in sessionStorage from IQTestPage
        navigate('/test/iqtest/email');
      }} 
    />
  );
}

// IQ Test Email Page wrapper
function IQTestEmailPage() {
  const navigate = useNavigate();
  const handleEmailSubmit = (email: string, acceptedTerms: boolean, acceptedPrivacy: boolean) => {
    // Handle email submission for IQ test
    console.log('IQ Test email submitted:', email);
    // Store email in sessionStorage
    sessionStorage.setItem('iqtest_email', email);
    // Navigate to checkout (universal payment page for IQ test)
    navigate('/test/iqtest/checkout');
  };
  return <PersonalityEmailPage onSubmit={handleEmailSubmit} />;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Inner component to use hooks (hooks must be inside Router)
function AppContent() {
  useDynamicTestTranslations();
  
  // Get all test configs for dynamic route generation - cache with useMemo
  const testConfigs = useMemo(() => getAllTestConfigs(), []);
  
  // Filter out special tests (IQ and Personality) - they use custom implementations
  const universalTests = testConfigs.filter(
    test => test.id !== 'iqtest' && test.id !== 'personality'
  );
  
  // Debug: Log routes being created (only in development)
  if (import.meta.env.DEV) {
    console.log('[App] Creating routes for universal tests:', universalTests.map(t => ({
      id: t.id,
      slug: t.slug,
      path: `/test/${t.slug}`
    })));
  }
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Special tests with custom implementations */}
        <Route path="/test/iqtest" element={<IQTestPage />} />
        <Route 
          path="/test/iqtest/analyzing" 
          element={
            <IQTestAnalyzingPage />
          } 
        />
        <Route 
          path="/test/iqtest/email" 
          element={
            <IQTestEmailPage />
          } 
        />
        <Route 
          path="/test/iqtest/checkout" 
          element={
            <IQTestCheckoutPage />
          } 
        />
        <Route 
          path="/test/iqtest/results" 
          element={
            <IQTestResultsPage />
          } 
        />
        <Route path="/test/personality" element={<PersonalityTestPage />} />
        <Route path="/test/personality/payment" element={<PaymentPage />} />
        <Route path="/test/personality/unlock" element={<UnlockPage />} />
        
        {/* Dynamic routes for all universal tests */}
        {universalTests.map((test) => (
          <Route
            key={test.id}
            path={`/test/${test.slug}`}
            element={<UniversalTestPage testId={test.id} />}
          />
        ))}
        {universalTests.map((test) => (
          <Route
            key={`${test.id}-payment`}
            path={`/test/${test.slug}/payment`}
            element={<UniversalPaymentPage testId={test.id} />}
          />
        ))}
        {universalTests.map((test) => (
          <Route
            key={`${test.id}-unlock-level`}
            path={`/test/${test.slug}/unlock/:level`}
            element={<UniversalUnlockPage testId={test.id} />}
          />
        ))}
        {universalTests.map((test) => (
          <Route
            key={`${test.id}-unlock`}
            path={`/test/${test.slug}/unlock`}
            element={<UniversalUnlockPage testId={test.id} />}
          />
        ))}
      </Routes>
    </>
  );
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Elements stripe={stripePromise}>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppContent />
        </Router>
      </Elements>
    </I18nextProvider>
  );
}

export default App;
