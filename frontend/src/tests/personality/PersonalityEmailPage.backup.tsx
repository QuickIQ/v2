import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

interface Props {
  onSubmit: (email: string, acceptedTerms: boolean, acceptedPrivacy: boolean) => void;
}

function PersonalityEmailPage({ onSubmit }: Props) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    setError('');

    if (!isValidEmail(email)) {
      setError(t('tests.personality.email.email_required') || 'Please enter a valid email address.');
      return;
    }

    if (!consent) {
      setError(t('tests.personality.email.consent_required') || 'Please accept the Terms and Privacy Policy.');
      return;
    }

    onSubmit(email, consent, consent);
  };

  const allChecked = email && consent && isValidEmail(email);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF4F0 0%, #FBEAFF 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
      position: 'relative',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: '500px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: isMobile ? '30px 20px' : '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: 'bold',
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
          }}
        >
          {t('tests.personality.email.title') || 'Get Your Results'}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#666',
            marginBottom: '32px',
            textAlign: 'center',
            lineHeight: '1.6',
            whiteSpace: 'nowrap',
          }}
        >
          {t('tests.personality.email.subtitle') || 'Enter your email to instantly receive your personality insights.'}
        </motion.p>

        {/* Email Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: '20px' }}
        >
          <label style={{
            display: 'block',
            textAlign: 'left',
            fontSize: '14px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '8px',
          }}>
            {t('tests.personality.email.email_label') || 'Email Address'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(''); // Clear error on input
            }}
            placeholder={t('tests.personality.email.email_placeholder') || 'your.email@example.com'}
            style={{
              width: '100%',
              padding: '14px 16px',
              border: error && !isValidEmail(email) ? '2px solid #e74c3c' : '2px solid #e0e0e0',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s ease',
              backgroundColor: 'white',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#FF8FA3';
              e.target.style.boxShadow = '0 0 0 3px rgba(255, 143, 163, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </motion.div>

        {/* Consent Checkbox */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginBottom: '24px' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                setError(''); // Clear error on change
              }}
              style={{
                width: '20px',
                height: '20px',
                marginTop: '2px',
                cursor: 'pointer',
                accentColor: '#FF8FA3',
              }}
            />
            <label style={{
              fontSize: '14px',
              color: '#555',
              lineHeight: '1.5',
              cursor: 'pointer',
              flex: 1,
            }}>
              {t('tests.personality.email.accept_consent') || 'I accept the "Terms of Service" and Privacy Policy.'}
            </label>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '12px',
              background: 'rgba(231, 76, 60, 0.1)',
              border: '1px solid rgba(231, 76, 60, 0.3)',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <p style={{
              fontSize: '14px',
              color: '#e74c3c',
              margin: 0,
              textAlign: 'center',
            }}>
              {error}
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          onClick={handleSubmit}
          disabled={!allChecked}
          whileHover={allChecked ? { scale: 1.02 } : {}}
          whileTap={allChecked ? { scale: 0.98 } : {}}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            cursor: allChecked ? 'pointer' : 'not-allowed',
            background: allChecked
              ? 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)'
              : '#e0e0e0',
            transition: 'all 0.3s ease',
            boxShadow: allChecked
              ? '0 4px 16px rgba(255, 143, 163, 0.3)'
              : 'none',
            opacity: allChecked ? 1 : 0.6,
          }}
        >
          {t('tests.personality.email.continue_button') || 'Continue'}
        </motion.button>

        {/* Privacy Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            fontSize: '12px',
            color: '#888',
            marginTop: '20px',
            textAlign: 'center',
            lineHeight: '1.5',
          }}
        >
          {t('tests.personality.email.privacy') || 'Your data will remain private and never shared.'}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default PersonalityEmailPage;
