import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../../hooks/useMobile';
import { PaymentInput } from './PaymentInput';
import paymentPageContent from '../../../data/shared/payment-page-content.json';
import paymentFormLabelsData from '../../../data/shared/payment-form-labels.json';

interface PaymentFormProps {
  language: 'en' | 'tr';
  testId: string;
  resultLevel?: 'excellent' | 'good' | 'developing' | null;
  onError?: (message: string) => void;
}

export function PaymentForm({ language, testId, resultLevel, onError }: PaymentFormProps) {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const paymentFormLabels = paymentFormLabelsData;
  const pricingContent = paymentPageContent.pricing;
  const trustBadgesContent = paymentPageContent.trustBadges;

  const [activeTab, setActiveTab] = useState<'card' | 'googlepay'>('card');
  const [processing, setProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCardNumber = (num: string): boolean => {
    const cleaned = num.replace(/\s/g, '');
    return cleaned.length >= 13 && cleaned.length <= 19 && /^\d+$/.test(cleaned);
  };

  const validateExpiry = (exp: string): boolean => {
    const match = exp.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    const month = parseInt(match[1]);
    const year = parseInt('20' + match[2]);
    const now = new Date();
    const expiryDate = new Date(year, month - 1);
    return month >= 1 && month <= 12 && expiryDate > now;
  };

  const validateCVV = (cvv: string): boolean => {
    return /^\d{3}$/.test(cvv);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!cardName.trim()) {
      newErrors.cardName = paymentFormLabels.errors.cardName[language] || paymentFormLabels.errors.cardName.en;
    }
    
    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = paymentFormLabels.errors.cardNumber[language] || paymentFormLabels.errors.cardNumber.en;
    }
    
    if (!validateExpiry(expiry)) {
      newErrors.expiry = paymentFormLabels.errors.expiry[language] || paymentFormLabels.errors.expiry.en;
    }
    
    if (!validateCVV(cvv)) {
      newErrors.cvv = paymentFormLabels.errors.cvv[language] || paymentFormLabels.errors.cvv.en;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (value: string): string => {
    const val = value.replace(/\D/g, '').slice(0, 4);
    return val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val;
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const errorMsg = paymentFormLabels.errors.validation[language] || paymentFormLabels.errors.validation.en;
      onError?.(errorMsg);
      return;
    }
    
    setProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Redirect to specific tier unlock page based on result level
      const tier = resultLevel || 'good'; // Default to 'good' if resultLevel is not available
      navigate(`/test/${testId}/unlock/${tier}`);
    } catch (error) {
      setProcessing(false);
      const errorMsg = paymentFormLabels.errors.failed[language] || paymentFormLabels.errors.failed.en;
      onError?.(errorMsg);
    }
  };

  const handleGooglePayClick = () => {
    setProcessing(true);
    setTimeout(() => {
      // Redirect to specific tier unlock page based on result level
      const tier = resultLevel || 'good'; // Default to 'good' if resultLevel is not available
      navigate(`/test/${testId}/unlock/${tier}`);
    }, 1000);
  };

  return (
    <motion.div
      id="payment-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(244, 246, 255, 0.5))',
        backdropFilter: 'blur(10px)',
        borderRadius: '32px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.8)',
        padding: isMobile ? '32px 24px' : '48px 40px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        width: isMobile ? '100%' : '102%',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      {/* Glowing border effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(123, 108, 255, 0.1) 0%, rgba(102, 200, 255, 0.1) 100%)',
        borderRadius: '32px',
        padding: '2px',
        zIndex: 0,
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.5), rgba(244, 246, 255, 0.5))',
          borderRadius: '30px',
        }} />
      </div>

      <div id="checkout-container" style={{ position: 'relative', zIndex: 1, fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <style>{`
          #checkout-container input::placeholder {
            color: #A7A7A7;
          }
          .pay-now-btn {
            background: linear-gradient(90deg, #7370FF 0%, #90C3FF 100%) !important;
            color: #FFFFFF !important;
            font-weight: 600 !important;
            font-size: 20px !important;
            padding: 18px 28px !important;
            width: 100% !important;
            border-radius: 16px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 10px !important;
            box-shadow: 0 8px 20px rgba(120, 135, 255, 0.35) !important;
            transition: all 0.18s ease-out !important;
            border: none !important;
          }
          .pay-now-btn span.lock-icon {
            font-size: 22px !important;
            filter: none !important;
          }
          ${!isMobile ? `.pay-now-btn:hover {
            transform: translateY(-2px) !important;
            filter: brightness(1.09) !important;
            box-shadow: 0 12px 28px rgba(120, 135, 255, 0.45) !important;
          }` : ''}
          .pay-now-btn:active {
            transform: translateY(0px) !important;
            filter: brightness(0.97) !important;
          }
        `}</style>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '8px',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            <span style={{ color: '#333' }}>{pricingContent.amount} {pricingContent.currency}</span>
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#666',
            opacity: 0.75,
            marginTop: '8px',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            {paymentFormLabels.messages.secureCheckout[language] || paymentFormLabels.messages.secureCheckout.en}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '32px',
          background: 'rgba(108, 99, 255, 0.05)',
          borderRadius: '16px',
          padding: '4px',
        }}>
          <motion.button
            onClick={() => setActiveTab('card')}
            whileHover={isMobile ? {} : { scale: 1.02 }}
            whileTap={isMobile ? {} : { scale: 0.98 }}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: activeTab === 'card'
                ? 'linear-gradient(135deg, #A8B4FF 0%, #B8E0FF 100%)'
                : 'transparent',
              border: 'none',
              borderRadius: '12px',
              color: activeTab === 'card' ? 'white' : '#666',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.12s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transform: activeTab === 'card' ? 'translateY(-1px)' : 'translateY(0)',
              boxShadow: activeTab === 'card' ? '0 4px 10px rgba(0,0,0,0.06)' : 'none',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {paymentFormLabels.tabs.card[language] || paymentFormLabels.tabs.card.en}
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('googlepay')}
            whileHover={isMobile ? {} : { scale: 1.02 }}
            whileTap={isMobile ? {} : { scale: 0.98 }}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: activeTab === 'googlepay'
                ? 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)'
                : 'transparent',
              border: 'none',
              borderRadius: '12px',
              color: activeTab === 'googlepay' ? 'white' : '#666',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.12s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transform: activeTab === 'googlepay' ? 'translateY(-1px)' : 'translateY(0)',
              boxShadow: activeTab === 'googlepay' ? '0 4px 10px rgba(0,0,0,0.06)' : 'none',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {paymentFormLabels.tabs.googlepay[language] || paymentFormLabels.tabs.googlepay.en}
          </motion.button>
        </div>

        {/* Card Form */}
        {activeTab === 'card' && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCardSubmit}
            style={{ marginBottom: '24px' }}
          >
            <PaymentInput
              label={paymentFormLabels.fields.cardNumber.label[language] || paymentFormLabels.fields.cardNumber.label.en}
              placeholder={paymentFormLabels.fields.cardNumber.placeholder[language] || paymentFormLabels.fields.cardNumber.placeholder.en}
              value={cardNumber}
              onChange={(value) => {
                setCardNumber(value);
                if (errors.cardNumber) {
                  setErrors(prev => ({ ...prev, cardNumber: '' }));
                }
              }}
              error={errors.cardNumber}
              maxLength={19}
              icon="💳"
              formatValue={formatCardNumber}
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '4px',
            }}>
              <PaymentInput
                label={paymentFormLabels.fields.expiry.label[language] || paymentFormLabels.fields.expiry.label.en}
                placeholder={paymentFormLabels.fields.expiry.placeholder[language] || paymentFormLabels.fields.expiry.placeholder.en}
                value={expiry}
                onChange={(value) => {
                  setExpiry(value);
                  if (errors.expiry) {
                    setErrors(prev => ({ ...prev, expiry: '' }));
                  }
                }}
                error={errors.expiry}
                maxLength={5}
                formatValue={formatExpiry}
              />
              <PaymentInput
                label={paymentFormLabels.fields.cvv.label[language] || paymentFormLabels.fields.cvv.label.en}
                placeholder={paymentFormLabels.fields.cvv.placeholder[language] || paymentFormLabels.fields.cvv.placeholder.en}
                value={cvv}
                onChange={(value) => {
                  setCvv(value);
                  if (errors.cvv) {
                    setErrors(prev => ({ ...prev, cvv: '' }));
                  }
                }}
                error={errors.cvv}
                type="password"
                maxLength={3}
              />
            </div>

            <PaymentInput
              label={paymentFormLabels.fields.cardName.label[language] || paymentFormLabels.fields.cardName.label.en}
              placeholder={paymentFormLabels.fields.cardName.placeholder[language] || paymentFormLabels.fields.cardName.placeholder.en}
              value={cardName}
              onChange={(value) => {
                setCardName(value);
                if (errors.cardName) {
                  setErrors(prev => ({ ...prev, cardName: '' }));
                }
              }}
              error={errors.cardName}
            />

            {/* Save Card Checkbox */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#666',
              }}>
                <input
                  type="checkbox"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#7B6CFF',
                  }}
                />
                <span>
                  {paymentFormLabels.fields.saveCard[language] || paymentFormLabels.fields.saveCard.en}
                </span>
              </label>
            </div>

            {/* Encryption Message */}
            <p style={{
              fontSize: '12px',
              color: '#888',
              textAlign: 'center',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}>
              {paymentFormLabels.messages.stripeSecured[language] || paymentFormLabels.messages.stripeSecured.en}
            </p>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={processing}
              className="pay-now-btn"
              style={{
                cursor: processing ? 'not-allowed' : 'pointer',
                marginBottom: '12px',
                background: processing ? '#ccc' : undefined,
              }}
            >
              {processing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                  {paymentFormLabels.messages.processing[language] || paymentFormLabels.messages.processing.en}
                </>
              ) : (
                <>
                  <span className="lock-icon">🔒</span> {paymentFormLabels.messages.unlockResults[language] || paymentFormLabels.messages.unlockResults.en}
                </>
              )}
            </motion.button>
          </motion.form>
        )}

        {/* Google Pay */}
        {activeTab === 'googlepay' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: '24px' }}
          >
            <motion.button
              onClick={handleGooglePayClick}
              disabled={processing}
              whileHover={isMobile || processing ? {} : { scale: 1.02 }}
              whileTap={isMobile || processing ? {} : { scale: 0.98 }}
              style={{
                width: '100%',
                padding: '18px',
                background: processing
                  ? '#ccc'
                  : 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
                border: 'none',
                borderRadius: '16px',
                color: 'white',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '700',
                cursor: processing ? 'not-allowed' : 'pointer',
                boxShadow: processing ? 'none' : '0 4px 20px rgba(66, 133, 244, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              {processing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                    }}
                  />
                  {paymentFormLabels.messages.processing[language] || paymentFormLabels.messages.processing.en}
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {paymentFormLabels.tabs.googlepay[language] || paymentFormLabels.tabs.googlepay.en}
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Trial Disclaimer */}
        {activeTab === 'card' && (
          <p style={{
            fontSize: '13px',
            color: '#888',
            textAlign: 'center',
            lineHeight: '1.4',
            marginTop: '8px',
            marginBottom: '0px',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            <span style={{ fontWeight: '500' }}>{pricingContent.trial.text[language] || pricingContent.trial.text.en}</span>
            <br />
            <span style={{ opacity: 0.6 }}>{pricingContent.trial.afterTrial[language] || pricingContent.trial.afterTrial.en}</span>
          </p>
        )}

        {/* Trial Footer */}
        <p style={{
          fontSize: '13px',
          color: '#888',
          textAlign: 'center',
          lineHeight: '1.5',
          marginTop: '0px',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          100% Secure • Encrypted by Stripe • Cancel Anytime
        </p>

        {/* Trust Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: isMobile ? '12px' : '16px',
          marginTop: '24px',
          padding: '12px 16px',
          background: 'rgba(0, 0, 0, 0.06)',
          borderRadius: '12px',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#666',
          }}>
            <span style={{ fontSize: '16px' }}>✅</span> {trustBadgesContent.verified[language] || trustBadgesContent.verified.en}
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#666',
          }}>
            <span style={{ fontSize: '16px' }}>🔒</span> {trustBadgesContent.secure[language] || trustBadgesContent.secure.en}
          </span>
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#666',
            gridColumn: isMobile ? '1 / -1' : 'auto',
          }}>
            <span style={{ fontSize: '16px' }}>💰</span> {trustBadgesContent.refund[language] || trustBadgesContent.refund.en}
          </span>
        </div>

        {/* Complete Your 7-Day Trial Securely */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '32px',
            width: '100%',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.3), transparent)',
            }} />
            <p style={{
              fontSize: isMobile ? '14px' : '16px',
              color: '#6c63ff',
              fontWeight: '600',
              padding: '0 16px',
              whiteSpace: 'nowrap',
            }}>
              {paymentFormLabels.messages.completeTrial[language] || paymentFormLabels.messages.completeTrial.en}
            </p>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.3), transparent)',
            }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

