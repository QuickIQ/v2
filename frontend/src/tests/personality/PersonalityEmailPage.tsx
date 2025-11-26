import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useMobile } from '../../hooks/useMobile';
import mailImage from '../../assets/images/landing/email/mail.svg';
import '../../App.css';

interface Props {
  onSubmit: (email: string, acceptedTerms: boolean, acceptedPrivacy: boolean) => void;
}

function PersonalityEmailPage({ onSubmit }: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Hide scrollbar on email page
  useEffect(() => {
    document.body.classList.add('landing-page-no-scrollbar');
    document.documentElement.classList.add('landing-page-no-scrollbar');
    
    return () => {
      document.body.classList.remove('landing-page-no-scrollbar');
      document.documentElement.classList.remove('landing-page-no-scrollbar');
    };
  }, []);

  const isValidEmail = (email: string) => {
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    
    // Extract domain
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    
    // Extract TLD (check last 1-2 parts for multi-part TLDs like .co.uk)
    const parts = domain.split('.');
    const lastPart = parts[parts.length - 1];
    const secondLastPart = parts.length > 1 ? parts[parts.length - 2] : '';
    const tld = secondLastPart ? `${secondLastPart}.${lastPart}` : lastPart;
    const validTLDs = ['com', 'net', 'org', 'co', 'io', 'co.uk', 'co.tr', 'co.io'];
    
    // Check if TLD is valid (either exact match or ends with valid single TLD)
    const isValidTLD = validTLDs.includes(tld) || validTLDs.includes(lastPart);
    if (!isValidTLD) {
      return false;
    }
    
    // List of valid email domains
    const validDomains = [
      'gmail.com', 'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'hotmail.de', 'hotmail.es', 'hotmail.it',
      'outlook.com', 'outlook.fr', 'outlook.de', 'outlook.es', 'outlook.it', 'outlook.co.uk',
      'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'yahoo.es',
      'protonmail.com', 'proton.me',
      'live.com', 'live.co.uk', 'live.fr', 'live.de',
      'icloud.com', 'me.com', 'mac.com',
      'aol.com', 'msn.com', 'ymail.com',
      'yandex.com', 'yandex.ru', 'yandex.tr'
    ];
    
    // Check if domain is valid
    return validDomains.includes(domain);
  };

  const handleSubmit = () => {
    setError('');

    if (!email) {
      setError(t('tests.personality.email.email_required') || 'Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      const domain = email.split('@')[1]?.toLowerCase();
      if (domain && !['gmail.com', 'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'yahoo.com', 'protonmail.com', 'live.com'].some(d => d === domain)) {
        setError(t('tests.personality.email.email_invalid') || 'Please enter a valid email address with a recognized domain (e.g., gmail.com, hotmail.com).');
      } else {
        setError(t('tests.personality.email.email_invalid') || 'Please enter a valid email address.');
      }
      return;
    }

    // Auto-accept consent since checkbox is removed
    onSubmit(email, true, true);
  };

  const allChecked = email && isValidEmail(email);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#E8D5FF', // Light purple/lavender background
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '20px' : '40px',
      position: 'relative',
    }}>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        {/* Mail SVG Image */}
        <motion.img
          src={mailImage}
          alt="Email illustration"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          style={{
            width: isMobile ? '174px' : '218px',
            height: 'auto',
            margin: '0 auto',
            marginBottom: isMobile ? '-6px' : '-2px',
          }}
        />

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#4A148C', // Dark purple/indigo
            marginBottom: '0',
            textAlign: 'center',
            lineHeight: '1.3',
          }}
        >
          {t('tests.personality.email.title') || 'Enter your email to access your personalized plan.'}
        </motion.h1>

        {/* Email Input */}
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(''); // Clear error on input
          }}
          placeholder={t('tests.personality.email.email_placeholder') || 'your.email@example.com'}
          style={{
            width: '100%',
            padding: isMobile ? '16px' : '18px',
            border: error && !isValidEmail(email) ? '2px solid #e74c3c' : '2px solid transparent',
            borderRadius: '12px',
            fontSize: isMobile ? '16px' : '18px',
            outline: 'none',
            transition: 'all 0.3s ease',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#4A148C';
            e.target.style.boxShadow = '0 0 0 3px rgba(74, 20, 140, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'transparent';
            e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
          }}
        />

        {/* Privacy/Safety Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: isMobile ? '12px 16px' : '14px 18px',
            background: '#D4B5FF', // Lighter purple background
            borderRadius: '12px',
            border: 'none',
          }}
        >
          <Lock 
            size={isMobile ? 18 : 20} 
            style={{ 
              color: '#4A148C',
              flexShrink: 0,
            }} 
          />
          <p style={{
            fontSize: isMobile ? '13px' : '14px',
            color: '#333',
            margin: 0,
            lineHeight: '1.5',
          }}>
            {t('tests.personality.email.privacy_message') || 'Your email will never be shared or used for any other purpose, and its security and privacy are 100% protected.'}
          </p>
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
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleSubmit}
          disabled={!allChecked}
          whileHover={allChecked ? { scale: 1.02 } : {}}
          whileTap={allChecked ? { scale: 0.98 } : {}}
          style={{
            width: 'auto',
            maxWidth: isMobile ? '80%' : '70%',
            padding: isMobile ? '16px 32px' : '18px 40px',
            borderRadius: '9999px',
            border: 'none',
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: 'white',
            cursor: allChecked ? 'pointer' : 'not-allowed',
            background: allChecked ? '#10B981' : '#9CA3AF', // Green when enabled, gray when disabled
            transition: 'all 0.3s ease',
            boxShadow: allChecked
              ? '0 4px 12px rgba(16, 185, 129, 0.3)'
              : 'none',
            opacity: allChecked ? 1 : 0.6,
            margin: '0 auto',
          }}
        >
          {t('tests.personality.email.explore_button') || 'See your Result'}
        </motion.button>
      </div>
    </div>
  );
}

export default PersonalityEmailPage;
