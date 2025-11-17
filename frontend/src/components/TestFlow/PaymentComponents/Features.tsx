import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMobile } from '../../../hooks/useMobile';

interface FeaturesProps {
  testId: string;
}

export function Features({ testId }: FeaturesProps) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const features = [
    {
      emoji: '🧠',
      title: getTranslation('payment.features.advancedPersonalityMap.title', i18n.language === 'tr' 
        ? 'Gelişmiş Kişilik Haritası' 
        : 'Advanced Personality Map'),
      desc: getTranslation('payment.features.advancedPersonalityMap.desc', i18n.language === 'tr' 
        ? 'Kendi kendinizi ayrıntılı bir şekilde anlamanıza yardımcı olan yapay zeka destekli bir kişilik çerçevesine sahip olun.'
        : 'Gain an AI-powered framework to understand yourself in rich detail.'),
    },
    {
      emoji: '💡',
      title: getTranslation('payment.features.applicableInitiatives.title', i18n.language === 'tr' 
        ? 'Uygulanabilir Kişisel İnisiyatifler' 
        : 'Applicable Personal Initiatives'),
      desc: getTranslation('payment.features.applicableInitiatives.desc', i18n.language === 'tr' 
        ? 'Güçlü bilgileri hemen ilişkilerinizi, işinize ve kişisel büyümeye geliştirin.'
        : 'Instantly apply strong insights to improve your relationships, work, and personal growth.'),
    },
    {
      emoji: '🎯',
      title: getTranslation('payment.features.personalizedPlan.title', i18n.language === 'tr' 
        ? 'Kişiselleştirilmiş Gelişim Planı' 
        : 'Personalized Growth Plan'),
      desc: getTranslation('payment.features.personalizedPlan.desc', i18n.language === 'tr' 
        ? 'Kendi bilginizi gerçek dünya başarısına dönüştürmek için kişiselleştirilmiş kılavuzla.'
        : 'Turn your awareness into real-world success through a tailored improvement guide.'),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: isMobile ? '48px' : '64px',
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
        {getTranslation(`tests.${testId}.payment.features_title`, i18n.language === 'tr' 
          ? 'Sonuçlarınızda Neler Var?' 
          : 'What\'s Included in Your Results?')}
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '20px' : '24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={isMobile ? {} : { 
              scale: 1.05, 
              y: -8,
              zIndex: 10,
              boxShadow: '0 8px 24px rgba(108, 99, 255, 0.25)',
              transition: { duration: 0.15, ease: 'easeOut' }
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(108, 99, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              marginBottom: '20px',
              width: '64px',
              height: '64px',
            }}>
              {/* Soft Pastel Ring Glow */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(221, 231, 255, 0.3) 0%, rgba(243, 232, 255, 0.25) 100%)',
                filter: 'blur(75px)',
                opacity: 0.3,
                zIndex: 0,
              }} />
              <span style={{ position: 'relative', zIndex: 1 }}>{feature.emoji}</span>
            </div>
            <h3 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              color: '#333',
              marginBottom: '12px',
              lineHeight: '1.3',
            }}>
              {feature.title}
            </h3>
            <p style={{
              fontSize: isMobile ? '14px' : '15px',
              color: '#666',
              lineHeight: '1.6',
              margin: 0,
            }}>
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

