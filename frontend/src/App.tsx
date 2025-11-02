import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import i18n from './i18n/config';
import { Header } from './components/layout/Header';
import Home from './pages/Home';
import TestFlow from './pages/TestFlow';
import IQTestPage from './pages/IQTestPage';
import './App.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Elements stripe={stripePromise}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test/:slug" element={<TestFlow />} />
            <Route path="/test/iqtest" element={<IQTestPage />} />
          </Routes>
        </Router>
      </Elements>
    </I18nextProvider>
  );
}

export default App;

