import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMobile } from '../../../hooks/useMobile';
import { Shield, CheckCircle, Lock, Star } from 'lucide-react';

interface SocialProofProps {
  testId: string;
}

interface Review {
  name: string;
  text: string;
  city: string;
  time: string;
}

const reviews: Record<'en' | 'tr', Review[]> = {
  en: [
    { name: 'Sarah M.', text: 'This test gave me incredible insights into my creative thinking style. Highly recommend!', city: 'New York, USA', time: '2 days ago' },
    { name: 'Michael K.', text: 'The analysis was spot-on and helped me understand my strengths better.', city: 'London, UK', time: '3 days ago' },
    { name: 'Emma L.', text: 'Worth every penny! The personalized recommendations were exactly what I needed.', city: 'Toronto, Canada', time: '4 days ago' },
    { name: 'David R.', text: 'Amazing test! The results were detailed and actionable.', city: 'Sydney, Australia', time: '5 days ago' },
    { name: 'Lisa T.', text: 'Best creativity test I\'ve taken. The career suggestions were spot-on.', city: 'Berlin, Germany', time: '6 days ago' },
  ],
  tr: [
    { name: 'Ayşe K.', text: 'Bu test bana yaratıcı düşünme tarzım hakkında inanılmaz içgörüler verdi. Kesinlikle tavsiye ederim!', city: 'İstanbul, Türkiye', time: '2 gün önce' },
    { name: 'Mehmet Y.', text: 'Analiz çok doğruydu ve güçlü yönlerimi daha iyi anlamama yardımcı oldu.', city: 'Ankara, Türkiye', time: '3 gün önce' },
    { name: 'Zeynep A.', text: 'Her kuruşa değer! Kişiselleştirilmiş öneriler tam ihtiyacım olan şeydi.', city: 'İzmir, Türkiye', time: '4 gün önce' },
    { name: 'Burak A.', text: 'Aldığım en iyi yaratıcılık testi. Kariyer önerileri tam ihtiyacım olan şeydi.', city: 'Adana, Türkiye', time: '5 gün önce' },
    { name: 'Selin N.', text: 'Analiz inanılmaz derecede detaylı ve doğruydu. Kendimi daha iyi anlamama yardımcı oldu.', city: 'Trabzon, Türkiye', time: '6 gün önce' },
  ]
};

export function SocialProof({ testId }: SocialProofProps) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

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
    <>
      {/* Why Trust QuickIQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          marginBottom: isMobile ? '48px' : '64px',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        <h2 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: '700',
          color: '#333',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          {getTranslation(`tests.${testId}.payment.why_trust`, i18n.language === 'tr' ? 'Neden QuickIQ\'ya Güvenmelisiniz?' : 'Why Trust QuickIQ?')}
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
              title: getTranslation(`tests.${testId}.payment.trust_feature1_title`, i18n.language === 'tr' ? 'Yapay Zeka Destekli Yaratıcılık Analizi' : 'AI-Powered Creativity Analysis'),
              desc: getTranslation(`tests.${testId}.payment.trust_feature1_desc`, i18n.language === 'tr' ? 'Gelişmiş algoritmalarla yaratıcı düşünme tarzınızın derinlemesine analizi.' : 'Deep analysis of your creative thinking style with advanced algorithms.'),
            },
            {
              icon: <CheckCircle size={32} />,
              title: getTranslation(`tests.${testId}.payment.trust_feature2_title`, i18n.language === 'tr' ? 'Uygulanabilir İçgörüler' : 'Actionable Insights'),
              desc: getTranslation(`tests.${testId}.payment.trust_feature2_desc`, i18n.language === 'tr' ? 'Gerçek hayatta kullanabileceğiniz pratik tavsiyeler.' : 'Practical advice you can use in real life.'),
            },
            {
              icon: <Lock size={32} />,
              title: getTranslation(`tests.${testId}.payment.trust_feature3_title`, i18n.language === 'tr' ? 'Kişiselleştirilmiş Gelişim Planı' : 'Personalized Growth Plan'),
              desc: getTranslation(`tests.${testId}.payment.trust_feature3_desc`, i18n.language === 'tr' ? 'Size özel hazırlanmış kapsamlı gelişim stratejisi.' : 'Comprehensive growth strategy tailored just for you.'),
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={isMobile ? {} : {
                scale: 1.05,
                y: -8,
                boxShadow: '0 12px 32px rgba(108, 99, 255, 0.25)',
                background: 'rgba(255, 255, 255, 0.95)',
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '20px',
                padding: '32px 24px',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease-out',
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
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
          {getTranslation(`tests.${testId}.payment.reviews`, i18n.language === 'tr' ? 'Yorumlar' : 'Reviews')}
        </h2>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#666',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          {getTranslation(`tests.${testId}.payment.reviews_subtitle`, i18n.language === 'tr' ? 'Mükemmel ⭐ 4.7 puan — 1769 yorum' : 'Excellent ⭐ 4.7 rating — 1769 reviews')}
        </p>

        <div style={{
          position: 'relative',
          overflow: 'hidden',
          maxWidth: isMobile ? '100%' : '1040px',
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
                    color: '#6c63ff',
                    fontWeight: '600',
                    marginBottom: '12px',
                  }}>
                    {getTranslation(`tests.${testId}.payment.verified_customer`, i18n.language === 'tr' ? 'Doğrulanmış Müşteri' : 'Verified Customer')}
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
    </>
  );
}

