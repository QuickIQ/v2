import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMobile } from '../../hooks/useMobile';
import { X, CreditCard, Lock, Shield, CheckCircle, Star } from 'lucide-react';
import { usePersonalityTestStore } from '../../store/personalityTestStore';
import '../../App.css';

// Recent Results Component (keeping existing functionality)
const names = [
  'Ayşe Doğan', 'Fatma Şen', 'Ali Demir', 'Mehmet Kaya', 'Maria Petrova', 'Ivanka Stoyanova',
  'Hassan Khalid', 'Noor Alhashimi', 'Omar Said', 'Lina Aboud', 'John Smith', 'Sarah Johnson',
  'Michael Brown', 'Emily Davis', 'David Wilson', 'Emma Martinez', 'James Anderson', 'Olivia Taylor',
  'William Thomas', 'Sophia Jackson', 'Daniel White', 'Isabella Harris', 'Matthew Martin', 'Mia Thompson'
];

const countries = [
  { flag: '🇹🇷', code: 'TR' },
  { flag: '🇸🇾', code: 'SY' },
  { flag: '🇧🇬', code: 'BG' },
  { flag: '🇮🇶', code: 'IQ' },
  { flag: '🇬🇷', code: 'GR' },
  { flag: '🇺🇸', code: 'US' },
  { flag: '🇬🇧', code: 'GB' },
  { flag: '🇩🇪', code: 'DE' },
  { flag: '🇫🇷', code: 'FR' },
  { flag: '🇪🇸', code: 'ES' }
];

const personalityTypes = {
  en: ['Architect', 'Logician', 'Commander', 'Debater', 'Advocate', 'Mediator', 'Protagonist', 'Campaigner', 'Logistician', 'Defender', 'Executive', 'Consul', 'Virtuoso', 'Adventurer', 'Entrepreneur', 'Entertainer'],
  tr: ['Mimar', 'Mantıkçı', 'Komutan', 'Tartışmacı', 'Savunucu', 'Arabulucu', 'Protagonist', 'Kampanyacı', 'Lojistikçi', 'Savunucu', 'Yönetici', 'Konsolos', 'Virtüöz', 'Maceracı', 'Girişimci', 'Eğlendirici']
};

function randomShortName(fullName: string): string {
  const parts = fullName.split(' ');
  if (parts.length < 2) return fullName;
  return `${parts[0]} ${parts[1][0]}.`;
}

interface RecentResult {
  name: string;
  country: string;
  type: string;
}

function generateResults(locale: string): RecentResult[] {
  const types = personalityTypes[locale as 'en' | 'tr'] || personalityTypes.en;
  return Array.from({ length: 8 }, () => {
    const name = names[Math.floor(Math.random() * names.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    return { name: randomShortName(name), country: country.flag, type };
  });
}

function RecentResults({ t, i18n, isMobile }: { t: any; i18n: any; isMobile: boolean }) {
  const [results, setResults] = useState<RecentResult[]>(() => generateResults(i18n.language));

  useEffect(() => {
    const interval = setInterval(() => {
      setResults(generateResults(i18n.language));
    }, 10000);
    return () => clearInterval(interval);
  }, [i18n.language]);

  return (
    <section style={{
      marginTop: isMobile ? '48px' : '64px',
      textAlign: 'center',
      padding: isMobile ? '0 20px' : '0',
    }}>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: isMobile ? '24px' : '28px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '24px',
        }}
      >
        {t('tests.personality.payment.recent_results') || (i18n.language === 'tr' ? 'Güncel Sonuçlar' : 'Recent Results')}
      </motion.h2>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        padding: isMobile ? '20px' : '32px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '12px',
      }}>
        <AnimatePresence mode="wait">
          {results.map((r, i) => (
            <motion.div
              key={`${r.name}-${r.country}-${i}-${Date.now()}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '16px',
                background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: isMobile ? '14px' : '15px',
                color: '#333',
                fontWeight: '500',
              }}>
                <span style={{ fontSize: '20px' }}>{r.country}</span>
                {r.name}
              </span>
              <span style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#4A90E2',
                fontWeight: '600',
                textAlign: 'right',
              }}>
                {r.type}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Credit Card Modal Component
function CreditCardModal({ isOpen, onClose, onSuccess, t, i18n, isMobile }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: () => void;
  t: any;
  i18n: any;
  isMobile: boolean;
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '20px' : '40px',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: isMobile ? '24px' : '32px',
            maxWidth: '500px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: 'bold',
              color: '#333',
            }}>
              {t('tests.personality.payment.card_form_title') || (i18n.language === 'tr' ? 'Kart Bilgileri' : 'Card Information')}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={24} color="#666" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px',
              }}>
                {t('tests.personality.payment.card_name') || (i18n.language === 'tr' ? 'Kart Üzerindeki İsim' : 'Name on Card')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF8FA3'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '8px',
              }}>
                {t('tests.personality.payment.card_number') || (i18n.language === 'tr' ? 'Kart Numarası' : 'Card Number')}
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="1234 5678 9012 3456"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '2px solid #e0e0e0',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#FF8FA3'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                }}>
                  {t('tests.personality.payment.card_expiry') || (i18n.language === 'tr' ? 'Son Kullanma' : 'Expiry')}
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    setExpiry(val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val);
                  }}
                  placeholder="MM/YY"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF8FA3'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                }}>
                  {t('tests.personality.payment.card_cvv') || 'CVV'}
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="123"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#FF8FA3'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={processing}
              whileHover={!processing ? { scale: 1.02 } : {}}
              whileTap={!processing ? { scale: 0.98 } : {}}
              style={{
                width: '100%',
                padding: '16px',
                background: processing 
                  ? '#ccc' 
                  : 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '700',
                cursor: processing ? 'not-allowed' : 'pointer',
                boxShadow: processing ? 'none' : '0 4px 20px rgba(255, 143, 163, 0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              {processing 
                ? (t('tests.personality.payment.processing') || (i18n.language === 'tr' ? 'İşleniyor...' : 'Processing...'))
                : (t('tests.personality.payment.pay_now') || (i18n.language === 'tr' ? 'Ödemeyi Tamamla' : 'Pay Now'))}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper function to get emojis based on personality type
function getPersonalityEmojis(typeCode: string): string[] {
  const emojiMap: Record<string, string[]> = {
    'ENFP': ['🌻', '✨', '🔥'],
    'ENTP': ['⚡', '💡', '🚀'],
    'ENFJ': ['🌻', '🤝', '💫'],
    'ENTJ': ['⚔️', '📈', '🏆'],
    'INFP': ['🌸', '💭', '🎨'],
    'INTP': ['🧠', '🔬', '💭'],
    'INFJ': ['🌙', '🔮', '💫'],
    'INTJ': ['🧠', '⚙️', '📈'],
    'ISFP': ['🎨', '🍃', '💫'],
    'ISTP': ['🛠️', '⚡', '🎯'],
    'ISFJ': ['🌿', '💝', '🛡️'],
    'ISTJ': ['📘', '📊', '✅'],
    'ESFP': ['💃', '🎉', '✨'],
    'ESTP': ['🚀', '⚡', '🎯'],
    'ESFJ': ['🤝', '💝', '🌟'],
    'ESTJ': ['💼', '🏆', '📊'],
  };
  return emojiMap[typeCode] || ['🌟'];
}

// Helper function to get gradient colors based on personality type
function getPersonalityGradient(typeCode: string): { from: string; to: string } {
  // Default gradient (pink to orange)
  const defaultGradient = { from: '#FF7B8A', to: '#FFD17D' };
  
  // Type-specific gradients (can be expanded)
  const gradientMap: Record<string, { from: string; to: string }> = {
    'ESTJ': { from: '#FF7B8A', to: '#FFD17D' },
    // Add more type-specific gradients as needed
  };
  
  return gradientMap[typeCode] || defaultGradient;
}

// Helper function to get personality result from store or localStorage
function usePersonalityResult() {
  const store = usePersonalityTestStore();
  const [result, setResult] = useState<{ typeCode: string; typeName: string } | null>(null);

  useEffect(() => {
    // Try store first
    if (store.personalityType) {
      // Try to get nickname from resultData
      let typeName = store.personalityType;
      if (store.resultData?.title) {
        // Title format: "INFP — Mediator" or "INTJ — Architect"
        const titleMatch = store.resultData.title.match(/—\s*(.+)/);
        if (titleMatch) {
          typeName = titleMatch[1].trim();
        } else {
          // Fallback: try to extract from title if format is different
          const parts = store.resultData.title.split('—');
          if (parts.length > 1) {
            typeName = parts[1].trim();
          }
        }
      } else {
        // Fallback: try to get from localStorage
        try {
          const saved = localStorage.getItem('personality_result');
          if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.typeName) {
              typeName = parsed.typeName;
            }
          }
        } catch (e) {
          console.error('Error parsing localStorage:', e);
        }
      }
      
      setResult({
        typeCode: store.personalityType,
        typeName: typeName,
      });
      return;
    }

    // Try localStorage
    try {
      const saved = localStorage.getItem('personality_result');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.typeCode) {
          setResult(parsed);
          return;
        }
      }
    } catch (e) {
      console.error('Error parsing localStorage:', e);
    }

    setResult(null);
  }, [store.personalityType, store.resultData]);

  return result;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const personalityResult = usePersonalityResult();
  const [showCardModal, setShowCardModal] = useState(false);
  const [testCount, setTestCount] = useState(() => {
    if (typeof window === 'undefined') return 8000;
    const saved = localStorage.getItem('personalityTestsCount');
    const savedTime = localStorage.getItem('personalityTestsTime');
    const now = Date.now();
    
    if (saved && savedTime) {
      const timeDiff = now - parseInt(savedTime);
      if (timeDiff < 86400000) { // Less than 24 hours
        return parseInt(saved);
      }
    }
    
    const newCount = Math.floor(7000 + Math.random() * 2000);
    localStorage.setItem('personalityTestsCount', newCount.toString());
    localStorage.setItem('personalityTestsTime', now.toString());
    return newCount;
  });

  useEffect(() => {
    const interval1 = setInterval(() => {
      setTestCount((prev) => {
        const newCount = prev + 1;
        localStorage.setItem('personalityTestsCount', newCount.toString());
        return newCount;
      });
    }, 60000); // Every 60 seconds

    const interval2 = setInterval(() => {
      setTestCount((prev) => {
        const newCount = prev + 2;
        localStorage.setItem('personalityTestsCount', newCount.toString());
        return newCount;
      });
    }, 120000); // Every 120 seconds

    // Check for daily reset
    const checkReset = setInterval(() => {
      const savedTime = localStorage.getItem('personalityTestsTime');
      if (savedTime) {
        const timeDiff = Date.now() - parseInt(savedTime);
        if (timeDiff >= 86400000) { // 24 hours
          const newCount = Math.floor(7000 + Math.random() * 2000);
          setTestCount(newCount);
          localStorage.setItem('personalityTestsCount', newCount.toString());
          localStorage.setItem('personalityTestsTime', Date.now().toString());
        }
      }
    }, 3600000); // Check every hour

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(checkReset);
    };
  }, []);

  const handleGooglePay = () => {
    setTimeout(() => {
      navigate('/test/personality/unlock');
    }, 1000);
  };

  const handleCardSuccess = () => {
    setShowCardModal(false);
    setTimeout(() => {
      navigate('/test/personality/unlock');
    }, 500);
  };

  const reviews = {
    en: [
      { name: 'Sarah M.', text: 'This test completely changed how I see myself. The insights are incredibly accurate.', city: 'New York, USA', time: '2 hours ago' },
      { name: 'Michael K.', text: 'Worth every penny. The personality analysis was spot-on and very detailed.', city: 'London, UK', time: '5 hours ago' },
      { name: 'Emma L.', text: 'I finally understand my strengths and how to use them in my career. Highly recommend!', city: 'Toronto, Canada', time: '8 hours ago' },
      { name: 'David R.', text: 'The most comprehensive personality test I\'ve ever taken. The results were eye-opening.', city: 'Sydney, Australia', time: '12 hours ago' },
      { name: 'Sophia T.', text: 'Amazing accuracy! Everything it said about me was true. Great investment in self-discovery.', city: 'Berlin, Germany', time: '1 day ago' },
      { name: 'James W.', text: 'The detailed report helped me understand my communication style better. Very insightful!', city: 'Los Angeles, USA', time: '2 days ago' },
      { name: 'Olivia H.', text: 'I was skeptical at first, but the results were spot-on. Highly recommend to everyone!', city: 'Chicago, USA', time: '3 days ago' },
      { name: 'Noah B.', text: 'Best personality test I\'ve taken. The career recommendations were exactly what I needed.', city: 'Miami, USA', time: '4 days ago' },
      { name: 'Isabella S.', text: 'The analysis was incredibly detailed and accurate. It helped me understand myself better.', city: 'Seattle, USA', time: '5 days ago' },
    ],
    tr: [
      { name: 'Rüya G.', text: 'Hayata bakış açımı yeniden düşünmemi sağladı. Sonuçlar gerçekten çok doğruydu.', city: 'İzmir, Türkiye', time: '3 saat önce' },
      { name: 'Ahmet C.', text: 'Sadece bir testte bu kadar netlik. Her kuruşuna değer.', city: 'Ankara, Türkiye', time: '6 saat önce' },
      { name: 'Abigail Y.', text: 'Her şey göz önünde bulundurulduğunda, buna değer. Kişilik analizi çok detaylı.', city: 'İstanbul, Türkiye', time: '9 saat önce' },
      { name: 'Mehmet D.', text: 'Güçlü yönlerimi ve nasıl kullanacağımı nihayet anladım. Kesinlikle tavsiye ederim!', city: 'Bursa, Türkiye', time: '1 gün önce' },
      { name: 'Zeynep K.', text: 'Aldığım en kapsamlı kişilik testi. Sonuçlar gerçekten göz açıcıydı.', city: 'Antalya, Türkiye', time: '2 gün önce' },
      { name: 'Can Y.', text: 'Detaylı rapor iletişim tarzımı daha iyi anlamama yardımcı oldu. Çok içgörülü!', city: 'Gaziantep, Türkiye', time: '3 gün önce' },
      { name: 'Elif M.', text: 'Başta şüpheliydim ama sonuçlar çok doğruydu. Herkese kesinlikle tavsiye ederim!', city: 'Konya, Türkiye', time: '4 gün önce' },
      { name: 'Burak A.', text: 'Aldığım en iyi kişilik testi. Kariyer önerileri tam ihtiyacım olan şeydi.', city: 'Adana, Türkiye', time: '5 gün önce' },
      { name: 'Selin N.', text: 'Analiz inanılmaz derecede detaylı ve doğruydu. Kendimi daha iyi anlamama yardımcı oldu.', city: 'Trabzon, Türkiye', time: '6 gün önce' },
    ]
  };

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const currentReviews = reviews[i18n.language as 'en' | 'tr'] || reviews.en;
  
  // Create extended array for seamless infinite loop (duplicate first 3 at the end)
  const extendedReviews = [...currentReviews, ...currentReviews.slice(0, 3)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => {
        const nextIndex = prev + 1;
        // If we've reached the end of original reviews, reset to 0 for seamless loop
        if (nextIndex >= currentReviews.length) {
          return 0;
        }
        return nextIndex;
      });
    }, 6000); // Every 6 seconds
    return () => clearInterval(interval);
  }, [currentReviews.length]);

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF4F1 0%, #FFE8E2 100%)',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '100px' : '120px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Personality Type Preview Section */}
        {personalityResult ? (() => {
          const gradient = getPersonalityGradient(personalityResult.typeCode);
          const emojis = getPersonalityEmojis(personalityResult.typeCode);
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="animate-fadeUp"
              style={{
                position: 'relative',
                maxWidth: '700px',
                margin: '0 auto 48px',
                background: 'linear-gradient(135deg, #FFF6F3 0%, #FFECE7 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '32px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                padding: isMobile ? '32px 24px' : '48px 40px',
                textAlign: 'center',
              }}
            >
              <p style={{
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '1px',
                color: '#FF7B8A',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {t('tests.personality.payment.your_type') || t('tests.personality.payment.your_type_label') || 'Your Personality Type'}
              </p>
              
              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '500',
                color: '#666',
                marginBottom: '24px',
              }}>
                {t('tests.personality.payment.blueprint_text') || 'Your core personality blueprint has been generated.'}
              </p>

              {/* Type Code - Main Visual Focus */}
              <h1 style={{
                fontSize: isMobile ? '56px' : '80px',
                fontWeight: '900',
                background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '4px',
                marginBottom: '12px',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                transition: 'filter 0.3s ease',
              }}>
                {personalityResult.typeCode}
              </h1>

              {/* Animated Emoji Background with Glow - Right below ESTJ */}
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '16px',
                height: isMobile ? '60px' : '80px',
              }}>
                {/* Glowing background circle */}
                <div style={{
                  position: 'absolute',
                  width: isMobile ? '80px' : '96px',
                  height: isMobile ? '80px' : '96px',
                  background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                  opacity: 0.3,
                  animation: 'pulse 3s ease-in-out infinite',
                }} />
                
                {/* Floating Emojis */}
                <div className="animate-float" style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  zIndex: 1,
                }}>
                  {emojis.map((emoji, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: isMobile ? '28px' : '36px',
                        display: 'inline-block',
                        animationDelay: `${index * 0.2}s`,
                      }}
                      className="float-emoji"
                    >
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Type Name */}
              <p style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: '500',
                color: '#888',
                fontStyle: 'italic',
                marginBottom: '24px',
              }}>
                {personalityResult.typeName}
              </p>

            {/* Preview Points */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '24px',
            }}>
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 182, 193, 0.3)',
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{ fontSize: '18px' }}>💪</span> {t('tests.personality.payment.preview_strengths') || 'Key strengths'}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '1.5',
                }}>
                  {t('tests.personality.payment.preview_point_1') || 'Empathetic, creative, and values-driven.'}
                </p>
              </div>
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 182, 193, 0.3)',
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{ fontSize: '18px' }}>🌱</span> {t('tests.personality.payment.preview_growth') || 'Hidden growth areas'}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '1.5',
                }}>
                  {t('tests.personality.payment.preview_point_2') || 'Can overthink or idealize outcomes.'}
                </p>
              </div>
              <div style={{
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 182, 193, 0.3)',
              }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span style={{ fontSize: '18px' }}>❤️</span> {t('tests.personality.payment.preview_relationships') || 'Relationships & communication patterns'}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '1.5',
                }}>
                  {t('tests.personality.payment.preview_point_3') || 'Connects deeply but needs emotional balance.'}
                </p>
              </div>
            </div>

            {/* Lock Message */}
            <div style={{
              padding: isMobile ? '24px' : '32px',
              background: 'linear-gradient(135deg, #FFF4F1 0%, #FFE8E2 100%)',
              borderRadius: '24px',
              border: '2px dashed #FFB6C1',
              textAlign: 'center',
              marginTop: '24px',
              boxShadow: 'inset 0 2px 8px rgba(255, 182, 193, 0.2)',
            }}>
              <div style={{
                fontSize: '32px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'center',
              }}>
                🔒
              </div>
              <p style={{
                fontSize: isMobile ? '14px' : '15px',
                color: '#666',
                lineHeight: '1.6',
                fontWeight: '500',
                marginBottom: '20px',
              }}>
                {t('tests.personality.payment.locked_subtext') || 'Your full detailed report is ready — including career paths, blind spots, growth roadmap, and personalized insights.'}
              </p>
              <p style={{
                fontSize: isMobile ? '13px' : '14px',
                color: '#888',
                marginBottom: '20px',
              }}>
                {t('tests.personality.payment.scroll_hint') || 'Unlock your full analysis below.'}
              </p>
              <motion.button
                onClick={() => {
                  const paymentSection = document.getElementById('payment-section');
                  if (paymentSection) {
                    paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #FF7B8A 0%, #FFAF6D 100%)',
                  border: 'none',
                  borderRadius: '999px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: isMobile ? '14px' : '16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(255, 123, 138, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                🔓 {t('tests.personality.payment.unlock_button') || 'Unlock Detailed Result'}
              </motion.button>
            </div>
          </motion.div>
          );
        })() : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              maxWidth: '600px',
              margin: '0 auto 48px',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              padding: isMobile ? '32px 24px' : '40px',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666',
              marginBottom: '20px',
            }}>
              {t('tests.personality.payment.missing_result') || 'We couldn\'t load your personality type. Please retake the test.'}
            </p>
            <Link
              to="/test/personality"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
                borderRadius: '12px',
                color: 'white',
                fontWeight: '600',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(255, 143, 163, 0.3)',
              }}
            >
              {t('tests.personality.payment.retake_test') || 'Retake Test'}
            </Link>
          </motion.div>
        )}

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
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#888',
              fontWeight: '500',
            }}
          >
            {t('tests.personality.payment.tests_completed') || (i18n.language === 'tr' 
              ? 'Bugün' 
              : 'Today')} <span style={{ fontWeight: '700', color: '#E26B6B' }}>{testCount.toLocaleString()}</span> {t('tests.personality.payment.tests_completed_suffix') || (i18n.language === 'tr' 
              ? 'kişi testi tamamladı' 
              : 'people completed the test')}
          </motion.p>
        </motion.div>

        {/* Payment Options Section */}
        <div id="payment-section" style={{ marginTop: '40px', scrollMarginTop: '100px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              maxWidth: '500px',
              margin: '0 auto 48px',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              borderRadius: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
              padding: isMobile ? '32px 24px' : '40px',
            }}
          >
          <p style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            {t('tests.personality.payment.trial_price') || (i18n.language === 'tr' ? '₺59,00 / 7 Günlük Deneme' : '$1.95 USD / 7-Day Trial')}
          </p>

          <motion.button
            onClick={handleGooglePay}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(66, 133, 244, 0.3)',
              transition: 'all 0.3s ease',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t('tests.personality.payment.googlepay') || (i18n.language === 'tr' ? 'Google Pay ile Öde' : 'Buy with Google Pay')}
          </motion.button>

          <motion.button
            onClick={() => setShowCardModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(20, 184, 166, 0.3)',
              transition: 'all 0.3s ease',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <CreditCard size={20} />
            {t('tests.personality.payment.creditcard') || (i18n.language === 'tr' ? 'Kredi Kartı veya Banka Kartı ile Öde' : 'Pay with Credit or Bank Card')}
          </motion.button>

          <p style={{
            fontSize: '13px',
            color: '#888',
            textAlign: 'center',
            lineHeight: '1.5',
          }}>
            {t('tests.personality.payment.trial_footer') || (i18n.language === 'tr' 
              ? 'Sonrasında ayda ₺1,199 — istediğiniz zaman iptal edebilirsiniz.'
              : 'Then $39.90 per month after trial — cancel anytime.')}
          </p>
          </motion.div>
        </div>

        {/* Why Trust QuickIQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
            marginBottom: '32px',
          }}>
            {t('tests.personality.payment.why_trust') || (i18n.language === 'tr' ? 'Neden QuickIQ\'ya Güvenmelisiniz?' : 'Why Trust QuickIQ?')}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '20px' : '24px',
            marginBottom: '32px',
          }}>
            {[
              {
                icon: <Shield size={32} />,
                title: t('tests.personality.payment.trust_feature1_title') || (i18n.language === 'tr' ? 'Yapay Zeka Destekli Kişilik Haritası' : 'AI-Powered Personality Map'),
                desc: t('tests.personality.payment.trust_feature1_desc') || (i18n.language === 'tr' ? 'Gelişmiş algoritmalarla kişiliğinizin derinlemesine analizi.' : 'Deep analysis of your personality with advanced algorithms.'),
              },
              {
                icon: <CheckCircle size={32} />,
                title: t('tests.personality.payment.trust_feature2_title') || (i18n.language === 'tr' ? 'Uygulanabilir İçgörüler' : 'Actionable Insights'),
                desc: t('tests.personality.payment.trust_feature2_desc') || (i18n.language === 'tr' ? 'Gerçek hayatta kullanabileceğiniz pratik tavsiyeler.' : 'Practical advice you can use in real life.'),
              },
              {
                icon: <Lock size={32} />,
                title: t('tests.personality.payment.trust_feature3_title') || (i18n.language === 'tr' ? 'Kişiselleştirilmiş Gelişim Planı' : 'Personalized Growth Plan'),
                desc: t('tests.personality.payment.trust_feature3_desc') || (i18n.language === 'tr' ? 'Size özel hazırlanmış kapsamlı gelişim stratejisi.' : 'Comprehensive growth strategy tailored just for you.'),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '20px',
                  padding: '32px 24px',
                  textAlign: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '8px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.6',
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Reviews Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            marginBottom: isMobile ? '48px' : '64px',
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#333',
            textAlign: 'center',
            marginBottom: '8px',
          }}>
            {t('tests.personality.payment.reviews') || (i18n.language === 'tr' ? 'Yorumlar' : 'Reviews')}
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            textAlign: 'center',
            marginBottom: '32px',
          }}>
            {t('tests.personality.payment.reviews_subtitle') || (i18n.language === 'tr' 
              ? 'Mükemmel ⭐ 4.7 puan — 1769 yorum' 
              : 'Excellent ⭐ 4.7 rating — 1769 reviews')}
          </p>

          <div style={{
            position: 'relative',
            overflow: 'hidden',
            maxWidth: isMobile ? '100%' : '1040px', // 3 cards (320px each) + 2 gaps (20px each) = 1000px, plus padding
            margin: '0 auto',
            padding: isMobile ? '0 10px' : '0 20px',
          }}>
            <div style={{
              display: 'flex',
              gap: '20px',
              transform: `translateX(-${currentReviewIndex * (isMobile ? 320 : 340)}px)`,
              transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}>
              {extendedReviews.map((review, index) => {
                const actualIndex = index % currentReviews.length;
                return (
                  <motion.div
                    key={`${actualIndex}-${index}`}
                    style={{
                      minWidth: isMobile ? '300px' : '320px',
                      width: isMobile ? '300px' : '320px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '24px',
                      padding: '24px',
                      boxShadow: 'none',
                      flexShrink: 0,
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}>
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#333',
                      }}>
                        {review.name}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="#FFD700" color="#FFD700" />
                        ))}
                      </div>
                    </div>
                    <p style={{
                      fontSize: '12px',
                      color: '#4A90E2',
                      fontWeight: '600',
                      marginBottom: '12px',
                    }}>
                      {t('tests.personality.payment.verified_customer') || (i18n.language === 'tr' ? 'Doğrulanmış Müşteri' : 'Verified Customer')}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '12px',
                    }}>
                      {review.text}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#999',
                    }}>
                      {review.city} • {review.time}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            textAlign: 'center',
            padding: '24px',
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: '16px',
            marginTop: '32px',
          }}
        >
          <p style={{
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6',
          }}>
            {t('tests.personality.payment.footer') || (i18n.language === 'tr'
              ? 'Başarılı ödemeden sonra sonuçlarınıza yönlendirileceksiniz. Verileriniz gizli tutulur.'
              : 'You\'ll be redirected to your results after successful payment. Your data remains private.')}
          </p>
        </motion.div>

        {/* Recent Results Section */}
        <RecentResults t={t} i18n={i18n} isMobile={isMobile} />
      </div>

      {/* Credit Card Modal */}
      <CreditCardModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSuccess={handleCardSuccess}
        t={t}
        i18n={i18n}
        isMobile={isMobile}
      />
    </main>
  );
}
