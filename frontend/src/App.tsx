import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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
// Utils
import { getAllTestConfigs } from './utils/testContentLoader';
import { useDynamicTestTranslations } from './hooks/useDynamicTestTranslations';
import './App.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Inner component to use hooks (hooks must be inside Router)
function AppContent() {
  useDynamicTestTranslations();
  
  // Get all test configs for dynamic route generation
  const testConfigs = getAllTestConfigs();
  
  // Filter out special tests (IQ and Personality) - they use custom implementations
  const universalTests = testConfigs.filter(
    test => test.id !== 'iqtest' && test.id !== 'personality'
  );
  
  // Debug: Log routes being created
  console.log('[App] Creating routes for universal tests:', universalTests.map(t => ({
    id: t.id,
    slug: t.slug,
    path: `/test/${t.slug}`
  })));
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Special tests with custom implementations */}
        <Route path="/test/iqtest" element={<IQTestPage />} />
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
        <Router>
          <AppContent />
        </Router>
      </Elements>
    </I18nextProvider>
  );
}

export default App;

