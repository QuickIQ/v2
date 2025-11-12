import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../../hooks/useMobile';
import { useEffect, useRef, useState } from 'react';
import { resultContent } from './resultContent';
import '../../../App.css';

// FadeInCard component - animates once on first view, then stays static
interface FadeInCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  disableHover?: boolean;
}

const FadeInCard = ({ children, delay = 0, className, style, disableHover = false }: FadeInCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView && !visible) {
      // Use requestAnimationFrame to ensure smooth scroll during animation
      requestAnimationFrame(() => {
        setVisible(true);
      });
    }
  }, [isInView, visible]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={disableHover ? {} : { 
        scale: 1.03,
        boxShadow: '0 20px 60px rgba(108, 99, 255, 0.3)',
        transition: { duration: 0.3 }
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Emoji configurations for different result levels
const levelConfig: Record<'excellent' | 'good' | 'developing', {
  heroEmojis: string[];
  sectionEmojis: string[];
}> = {
  excellent: {
    heroEmojis: ['💡', '✨', '🚀'],
    sectionEmojis: ['💡', '🎨', '🌟', '💪', '🔮', '🌍', '🎯', '💫', '🔬', '🎭'],
  },
  good: {
    heroEmojis: ['🎨', '🌟', '💫'],
    sectionEmojis: ['🎨', '💡', '💪', '🔮', '🌍', '🎯', '💫', '🔬', '🎭', '🌟'],
  },
  developing: {
    heroEmojis: ['🌱', '📚', '🔍'],
    sectionEmojis: ['🌱', '📚', '💪', '🔮', '🌍', '🎯', '💫', '🔬', '🎭', '🌟'],
  },
};

interface CreativeThinkingUnlockTemplateProps {
  level: 'excellent' | 'good' | 'developing';
  locale?: 'en' | 'tr';
}

export default function CreativeThinkingUnlockTemplate({ level, locale }: CreativeThinkingUnlockTemplateProps) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const navigate = useNavigate();

  const currentLocale = (locale || i18n.language || 'en').split('-')[0] as 'en' | 'tr';
  const content = resultContent[level];
  const config = levelConfig[level];

  const scrollToTests = () => {
    navigate('/');
    setTimeout(() => {
      const testsSection = document.getElementById('tests-section') || document.getElementById('cta-test-card');
      if (testsSection) {
        testsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Card gradient variations
  const cardGradients = [
    'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 255, 0.95) 100%)',
    'linear-gradient(135deg, rgba(245, 245, 255, 0.95) 0%, rgba(240, 240, 255, 0.95) 100%)',
    'linear-gradient(135deg, rgba(250, 240, 255, 0.95) 0%, rgba(245, 235, 255, 0.95) 100%)',
  ];

  // Section titles and content based on level
  const sections = [
    {
      key: 'overview',
      icon: config.sectionEmojis[0],
      title: currentLocale === 'tr' ? 'Yaratıcı Düşünme Profiliniz' : 'Your Creative Thinking Profile',
      text: content.summary,
    },
    {
      key: 'insights',
      icon: config.sectionEmojis[1],
      title: currentLocale === 'tr' ? 'Temel İçgörüler' : 'Key Insights',
      text: currentLocale === 'tr' 
        ? 'Yaratıcı düşünme tarzınız hakkında en önemli bulgular:'
        : 'The most important findings about your creative thinking style:',
      insights: content.insights,
    },
    {
      key: 'strengths',
      icon: config.sectionEmojis[2],
      title: currentLocale === 'tr' ? 'Güçlü Yönleriniz' : 'Your Strengths',
      text: content.sections?.strengths || (level === 'excellent'
        ? (currentLocale === 'tr' 
          ? 'Yaratıcı düşünme konusunda olağanüstü yeteneklere sahipsiniz. İşte en güçlü yönleriniz:'
          : 'You possess exceptional creative thinking abilities. Here are your strongest areas:')
        : level === 'good'
        ? (currentLocale === 'tr'
          ? 'Yaratıcı düşünme konusunda güçlü yetenekleriniz var. İşte öne çıkan güçlü yönleriniz:'
          : 'You have strong creative thinking skills. Here are your standout strengths:')
        : (currentLocale === 'tr'
          ? 'Yaratıcı düşünme potansiyeliniz gelişiyor. İşte güçlü yönleriniz:'
          : 'Your creative thinking potential is developing. Here are your strengths:')),
    },
    {
      key: 'growth',
      icon: config.sectionEmojis[3],
      title: currentLocale === 'tr' ? 'Gelişim Alanları' : 'Growth Areas',
      text: content.sections?.growthAreas || (level === 'excellent'
        ? (currentLocale === 'tr'
          ? 'Mükemmel seviyede olsanız bile, yaratıcı düşünmenizi daha da geliştirebileceğiniz alanlar:'
          : 'Even at an excellent level, areas where you can further enhance your creative thinking:')
        : level === 'good'
        ? (currentLocale === 'tr'
          ? 'Yaratıcı potansiyelinizi daha da artırmak için odaklanabileceğiniz alanlar:'
          : 'Areas you can focus on to further increase your creative potential:')
        : (currentLocale === 'tr'
          ? 'Yaratıcı düşünme yeteneklerinizi geliştirmek için pratik yapabileceğiniz alanlar:'
          : 'Areas you can practice to develop your creative thinking abilities:')),
    },
    {
      key: 'application',
      icon: config.sectionEmojis[4],
      title: currentLocale === 'tr' ? 'Pratik Uygulamalar' : 'Practical Applications',
      text: content.sections?.practicalApplications || (currentLocale === 'tr'
        ? 'Yaratıcı düşünme becerilerinizi günlük hayatta ve kariyerinizde nasıl kullanabileceğiniz:'
        : 'How you can apply your creative thinking skills in daily life and career:'),
    },
    {
      key: 'future',
      icon: config.sectionEmojis[5],
      title: currentLocale === 'tr' ? 'Gelecek Potansiyeli' : 'Future Potential',
      text: content.sections?.futurePotential || (currentLocale === 'tr'
        ? 'Yaratıcı düşünme yeteneklerinizi geliştirmeye devam ederseniz neler başarabileceğiniz:'
        : 'What you can achieve if you continue developing your creative thinking abilities:'),
    },
  ];

  // Render section card
  const renderSection = (section: typeof sections[0], index: number, delay: number) => {
    const gradientIndex = index % 3;

    return (
      <FadeInCard
        key={section.key}
        delay={delay}
        style={{
          background: cardGradients[gradientIndex],
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '32px',
          padding: isMobile ? '32px 24px' : '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(108, 99, 255, 0.2)',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <span style={{ fontSize: '32px' }}>{section.icon}</span>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}>
            {section.title}
          </h2>
        </div>
        <div style={{ 
          color: '#555', 
          lineHeight: '1.8', 
          fontSize: '15px', 
          whiteSpace: 'pre-line',
          marginBottom: section.key === 'insights' ? '32px' : '0',
        }}>
          <p>{section.text}</p>
        </div>

        {/* Insights List for insights section - Circular Layout */}
        {section.key === 'insights' && section.insights && (
          <div style={{
            marginTop: '48px',
            position: 'relative',
            width: '100%',
            minHeight: isMobile ? 'auto' : '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: isMobile ? '0' : '40px',
          }}>
            {/* Central Emoji Group */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                zIndex: 10,
                background: 'radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                padding: '20px',
              }}
            >
              {config.heroEmojis.map((emoji, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  style={{
                    fontSize: isMobile ? '40px' : '48px',
                    display: 'inline-block',
                    filter: 'drop-shadow(0 4px 8px rgba(108, 99, 255, 0.3))',
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>

            {/* Circular Card Layout */}
            {!isMobile ? (
              <div style={{
                position: 'relative',
                width: '100%',
                height: '600px',
              }}>
                {section.insights.slice(0, 5).map((insight, index) => {
                  // Calculate position for circular layout
                  const angle = (index * 360) / 5 - 90; // Start from top
                  const radius = 200; // Distance from center
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  // Extract title and description
                  const parts = insight.split(':');
                  const title = parts.length > 1 ? parts[0].trim() : '';
                  const description = parts.length > 1 ? parts.slice(1).join(':').trim() : insight;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                      }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4, ease: 'easeOut' }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      style={{
                        position: 'absolute',
                        top: `calc(50% + ${y}px)`,
                        left: `calc(50% + ${x}px)`,
                        transform: 'translate(-50%, -50%)',
                        width: '170px',
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '14px',
                        padding: '14px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(108, 99, 255, 0.2)',
                        cursor: 'pointer',
                        zIndex: 1,
                        overflow: 'hidden',
                      }}
                    >
                      {/* Shimmer Effect on Hover */}
                      <motion.div
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{
                          x: '200%',
                          opacity: [0, 0.6, 0],
                          transition: {
                            duration: 0.2,
                            ease: 'easeInOut',
                          }
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '50%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.5), transparent)',
                          transform: 'skewX(-20deg)',
                          pointerEvents: 'none',
                          zIndex: 2,
                        }}
                      />
                      <div style={{
                        position: 'relative',
                        zIndex: 1,
                      }}>
                        {title && (
                          <p style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6c63ff',
                            margin: '0 0 6px 0',
                            lineHeight: '1.3',
                          }}>
                            {title}
                          </p>
                        )}
                        <p style={{
                          fontSize: '11px',
                          color: '#666',
                          lineHeight: '1.4',
                          margin: 0,
                        }}>
                          {description.length > 100 ? description.substring(0, 100) + '...' : description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              // Mobile: Vertical Stack
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
                marginTop: '200px',
              }}>
                {section.insights.slice(0, 5).map((insight, index) => {
                  const parts = insight.split(':');
                  const title = parts.length > 1 ? parts[0].trim() : '';
                  const description = parts.length > 1 ? parts.slice(1).join(':').trim() : insight;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '14px',
                        padding: '14px',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(108, 99, 255, 0.2)',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{
                          x: '200%',
                          opacity: [0, 0.6, 0],
                          transition: { duration: 0.2, ease: 'easeInOut' }
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '50%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.5), transparent)',
                          transform: 'skewX(-20deg)',
                          pointerEvents: 'none',
                          zIndex: 2,
                        }}
                      />
                      <div style={{ position: 'relative', zIndex: 1 }}>
                        {title && (
                          <p style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6c63ff',
                            margin: '0 0 6px 0',
                            lineHeight: '1.3',
                          }}>
                            {title}
                          </p>
                        )}
                        <p style={{
                          fontSize: '11px',
                          color: '#666',
                          lineHeight: '1.4',
                          margin: 0,
                        }}>
                          {description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </FadeInCard>
    );
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #E4ECFF 0%, #F5F0FF 50%, #FFF9F5 100%)',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '100px' : '120px',
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {/* Hero Section */}
        <FadeInCard
          delay={0}
          disableHover={true}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '40px' : '56px',
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            {config.heroEmojis.map((emoji, index) => (
              <span
                key={index}
                className="float-emoji"
                style={{
                  fontSize: '48px',
                  animationDelay: `${index * 0.2}s`,
                  display: 'inline-block',
                  willChange: 'transform',
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
          <h1 style={{
            fontSize: isMobile ? '32px' : '42px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}>
            {content.title}
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            lineHeight: '1.6',
          }}>
            {content.summary}
          </p>
        </FadeInCard>

        {/* Section Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '24px' : '32px',
        }}>
          {sections.map((section, index) => 
            renderSection(section, index, index * 0.1)
          )}
        </div>

        {/* Explore Other Tests Section */}
        <FadeInCard
          delay={0.5}
          style={{
            background: 'linear-gradient(135deg, #F5F0FF 0%, #E4ECFF 100%)',
            borderRadius: '32px',
            padding: isMobile ? '40px 24px' : '48px',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(108, 99, 255, 0.3)',
            marginTop: isMobile ? '32px' : '48px',
          }}
        >
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            ⭐
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '800',
            color: '#6c63ff',
            marginBottom: '12px',
          }}>
            {currentLocale === 'tr' ? 'Daha Fazlasını Keşfetmeye Hazır mısınız?' : 'Ready to Explore More?'}
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}>
            {currentLocale === 'tr' 
              ? 'İçgörülerinizi derinleştirmek için diğer kişilik ve zeka testlerini keşfedin.'
              : 'Discover other personality & intelligence tests to deepen your insight.'}
          </p>
          <motion.button
            onClick={scrollToTests}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: isMobile ? '16px 32px' : '18px 40px',
              background: 'linear-gradient(135deg, #6c63ff 0%, #9bc9ed 100%)',
              border: 'none',
              borderRadius: '999px',
              color: 'white',
              fontWeight: '700',
              fontSize: isMobile ? '16px' : '18px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(108, 99, 255, 0.4)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            ✨ {currentLocale === 'tr' ? 'Diğer Testleri Keşfet' : 'Explore Other Tests'}
          </motion.button>
        </FadeInCard>
      </div>
    </main>
  );
}

