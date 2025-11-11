import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import i18n from './i18n/config';
import { Header } from './components/layout/Header';
import Home from './pages/Home';
import TestFlow from './pages/TestFlow';
import IQTestPage from './pages/IQTestPage';
import PersonalityTestPage from './pages/PersonalityTestPage';
import CreativeThinkingTestPage from './pages/CreativeThinkingTestPage';
import AutismTestPage from './pages/AutismTestPage';
import DisorderTestPage from './pages/DisorderTestPage';
import PaymentPage from './tests/personality/PaymentPage';
import UnlockPage from './tests/personality/UnlockPage';
import CreativeThinkingPaymentPage from './tests/iq/creative-thinking/CreativeThinkingPaymentPage';
import CreativeThinkingUnlockPage from './tests/iq/creative-thinking/CreativeThinkingUnlockPage';
import AutismPaymentPage from './tests/iq/autism/AutismPaymentPage';
import AutismUnlockPage from './tests/iq/autism/AutismUnlockPage';
import DisorderPaymentPage from './tests/iq/disorder/DisorderPaymentPage';
import DisorderUnlockPage from './tests/iq/disorder/DisorderUnlockPage';
import { useDynamicTestTranslations } from './hooks/useDynamicTestTranslations';
import './App.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// Inner component to use hooks (hooks must be inside Router)
function AppContent() {
  useDynamicTestTranslations();
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test/:slug" element={<TestFlow />} />
        <Route path="/test/iqtest" element={<IQTestPage />} />
        <Route path="/test/personality" element={<PersonalityTestPage />} />
        <Route path="/test/personality/payment" element={<PaymentPage />} />
        <Route path="/test/personality/unlock" element={<UnlockPage />} />
        <Route path="/test/creative-thinking" element={<CreativeThinkingTestPage />} />
        <Route path="/test/creative-thinking/payment" element={<CreativeThinkingPaymentPage />} />
        <Route path="/test/creative-thinking/unlock/:level" element={<CreativeThinkingUnlockPage />} />
        <Route path="/test/creative-thinking/unlock" element={<CreativeThinkingUnlockPage />} />
        <Route path="/test/autism" element={<AutismTestPage />} />
        <Route path="/test/autism/payment" element={<AutismPaymentPage />} />
        <Route path="/test/autism/unlock/:level" element={<AutismUnlockPage />} />
        <Route path="/test/autism/unlock" element={<AutismUnlockPage />} />
        <Route path="/test/disorder" element={<DisorderTestPage />} />
        <Route path="/test/disorder/payment" element={<DisorderPaymentPage />} />
        <Route path="/test/disorder/unlock/:level" element={<DisorderUnlockPage />} />
        <Route path="/test/disorder/unlock" element={<DisorderUnlockPage />} />
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

