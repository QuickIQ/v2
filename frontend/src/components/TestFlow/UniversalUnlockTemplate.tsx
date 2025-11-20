import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { useEffect, useRef, useState } from 'react';
import { getTestConfig } from '../../utils/testContentLoader';
import levelEmojisData from '../../data/shared/level-emojis.json';
import '../../App.css';

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
        boxShadow: '0 20px 60px rgba(33, 150, 243, 0.3)',
        transition: { duration: 0.3 }
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Load emoji configurations from JSON
const levelConfig = levelEmojisData as Record<'excellent' | 'good' | 'developing', {
  heroEmojis: string[];
  sectionEmojis: string[];
}>;

interface UniversalUnlockTemplateProps {
  testId: string;
  level: 'excellent' | 'good' | 'developing';
  locale?: 'en' | 'tr';
}

export default function UniversalUnlockTemplate({ testId, level, locale }: UniversalUnlockTemplateProps) {
  const { t, i18n } = useTranslation();
  const isMobile = useMobile();
  const navigate = useNavigate();

  // Supported locales: 30 languages
  const supportedLocales = ['en', 'es', 'de', 'fr', 'pt-br', 'it', 'nl', 'sv', 'no', 'tr', 'da', 'fi', 'ro', 'cs', 'sk', 'hu', 'pl', 'hr', 'sr-latn', 'id', 'tl', 'ms', 'et', 'lv', 'lt', 'sl', 'is', 'ga', 'eu', 'ca'] as const;
  type SupportedLocale = typeof supportedLocales[number];
  
  // Get current locale, normalize to supported format
  const getCurrentLocale = (): SupportedLocale => {
    const rawLocale = (locale || i18n.language || 'en').toLowerCase();
    // Handle pt-BR, sr-LATN etc.
    if (rawLocale.startsWith('pt')) return 'pt-br';
    if (rawLocale.startsWith('sr')) return 'sr-latn';
    const baseLocale = rawLocale.split('-')[0];
    return (supportedLocales.includes(baseLocale as SupportedLocale) ? baseLocale : 'en') as SupportedLocale;
  };
  
  const currentLocale = getCurrentLocale();
  const config = levelConfig[level];
  const testConfig = getTestConfig(testId);
  const testName = testConfig?.name?.[currentLocale] || testId;
  
  // Load result content from JSON
  const [resultContent, setResultContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResultContent = async () => {
      try {
        const content = await import(`../../data/tests/results/${testId}.json`);
        setResultContent(content.default);
      } catch (error) {
        // Fallback to empty content structure
        setResultContent({
          [level]: {
            level,
            title: '',
            summary: '',
            insights: [],
            sections: {
              strengths: '',
              growthAreas: '',
              practicalApplications: '',
              futurePotential: ''
            }
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadResultContent();
  }, [testId, level]);

  // Helper function to get localized text
  const getLocalizedText = (text: string | Record<string, string> | undefined, fallbackLocale: SupportedLocale = 'en'): string => {
    if (!text) return '';
    if (typeof text === 'string') return text; // Backward compatibility
    if (typeof text === 'object') {
      // Try current locale first, then fallback to 'en'
      return text[currentLocale] || text[fallbackLocale] || Object.values(text)[0] || '';
    }
    return '';
  };

  // Get content from JSON or translation keys
  const getContent = () => {
    // Try JSON first
    if (resultContent && resultContent[level]) {
      const levelData = resultContent[level];
      const sections = Array.isArray(levelData.sections) 
        ? levelData.sections.map((section: any) => ({
            icon: section.icon || '',
            title: getLocalizedText(section.title),
            text: getLocalizedText(section.text),
            insights: Array.isArray(section.insights) 
              ? section.insights.map((insight: any) => getLocalizedText(insight))
              : [],
          }))
        : [];
      
      return {
        title: getLocalizedText(levelData.title),
        summary: getLocalizedText(levelData.summary),
        insights: Array.isArray(levelData.insights)
          ? levelData.insights.map((insight: any) => getLocalizedText(insight))
          : [],
        sections: sections,
      };
    }

    // Fallback to translation keys
    const baseKey = `tests.${testId}.result.${level}`;
    return {
      title: t(`${baseKey}.title`) || '',
      summary: t(`${baseKey}.summary`) || '',
      insights: (t(`${baseKey}.insights`, { returnObjects: true }) as string[]) || [],
      sections: [],
    };
  };

  const content = loading ? {
    title: '',
    summary: '',
    insights: [],
    sections: []
  } : getContent();

  const scrollToTests = () => {
    navigate('/');
    setTimeout(() => {
      const testsSection = document.getElementById('tests-section') || document.getElementById('cta-test-card');
      if (testsSection) {
        testsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Card background colors for 11 cards
  const cardBackgrounds = [
    '#EEF5FF',  // Card 1
    '#F2F1FF',  // Card 2
    '#F8F1FF',  // Card 3
    '#FFF0FA',  // Card 4
    '#FFFFFF',  // Card 5
    '#EEF5FF',  // Card 6
    '#F2F1FF',  // Card 7
    '#F8F1FF',  // Card 8
    '#FFF0FA',  // Card 9
    '#FFFFFF',  // Card 10
    '#2A2420',  // Card 11
  ];

  // Section titles - dynamic based on test name
  const getSectionTitle = (key: string) => {
    const titles: Record<string, { en: string; tr: string }> = {
      overview: {
        en: `Your ${testName} Profile`,
        tr: `${testName} Profiliniz`
      },
      insights: {
        en: 'Key Insights',
        tr: 'Temel İçgörüler'
      },
      strengths: {
        en: 'Your Strengths',
        tr: 'Güçlü Yönleriniz'
      },
      growth: {
        en: 'Growth Areas',
        tr: 'Gelişim Alanları'
      },
      application: {
        en: 'Practical Applications',
        tr: 'Pratik Uygulamalar'
      },
      future: {
        en: 'Future Potential',
        tr: 'Gelecek Potansiyeli'
      }
    };
    return titles[key]?.[currentLocale] || key;
  };

  // Section titles and content based on level
  // Use sections from JSON if available, otherwise use empty sections
  const sections = Array.isArray(content.sections) && content.sections.length > 0
    ? content.sections.map((section: any, index: number) => ({
        key: `section${index + 1}`,
        icon: section.icon || '',
        title: section.title || '',
        text: section.text || '',
        insights: section.insights || [],
      }))
    : [
        {
          key: 'section1',
          icon: '',
          title: '',
          text: '',
        },
        {
          key: 'section2',
          icon: '',
          title: '',
          text: '',
          insights: [],
        },
        {
          key: 'section3',
          icon: '',
          title: '',
          text: '',
        },
        {
          key: 'section4',
          icon: '',
          title: '',
          text: '',
    },
    {
          key: 'section5',
          icon: '',
          title: '',
          text: '',
        },
        {
          key: 'section6',
          icon: '',
          title: '',
          text: '',
        },
        {
          key: 'section7',
          icon: '',
          title: '',
          text: '',
        },
        {
          key: 'section8',
          icon: '',
          title: '',
          text: '',
        },
        {
          key: 'section9',
          icon: '',
          title: '',
          text: '',
        },
        {
          key: 'section10',
          icon: '',
          title: '',
          text: '',
    },
    {
          key: 'section11',
          icon: '',
          title: '',
          text: '',
        },
      ];

  // Soft, light title colors for each card
  const titleColors = [
    '#8B9DC3',  // Card 1 - Soft blue
    '#A8A8D8',  // Card 2 - Soft purple
    '#C8A8D8',  // Card 3 - Soft lavender
    '#E8B8C8',  // Card 4 - Soft pink
    '#B8C8D8',  // Card 5 - Soft blue-gray
    '#8B9DC3',  // Card 6 - Soft blue
    '#A8A8D8',  // Card 7 - Soft purple
    '#C8A8D8',  // Card 8 - Soft lavender
    '#E8B8C8',  // Card 9 - Soft pink
    '#B8C8D8',  // Card 10 - Soft blue-gray
    '#D4A574',  // Card 11 - Soft brown/tan
  ];

  // Render section card
  const renderSection = (section: typeof sections[0], index: number, delay: number) => {
    const backgroundColor = cardBackgrounds[index] || cardBackgrounds[0];
    const titleColor = titleColors[index] || titleColors[0];

    return (
      <FadeInCard
        key={section.key}
        delay={delay}
        style={{
          background: backgroundColor,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '32px',
          padding: isMobile ? '32px 24px' : '40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(108, 99, 255, 0.2)',
        }}
      >
        {/* İkon ve başlık - sadece varsa göster */}
        {(section.icon || section.title) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
            marginBottom: section.text ? '20px' : '0',
        }}>
            {section.icon && (
          <span style={{ fontSize: '32px' }}>{section.icon}</span>
            )}
            {section.title && (
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
                fontWeight: '700',
                color: titleColor,
            margin: 0,
                opacity: 0.85,
          }}>
            {section.title}
          </h2>
            )}
        </div>
        )}
        
        {section.text && (
          <div style={{ 
            color: '#555', 
            lineHeight: '1.8', 
            fontSize: '15px', 
            whiteSpace: 'pre-line',
            marginBottom: section.insights && section.insights.length > 0 ? '20px' : '0',
          }}>
            <p style={{ margin: 0 }}>{section.text}</p>
          </div>
        )}
        {section.insights && section.insights.length > 0 && (
          <div style={{ 
            color: '#555', 
            lineHeight: '1.8', 
            fontSize: '15px',
          }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {section.insights.map((insight: string, idx: number) => (
                <li key={idx} style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#2196F3' }}>•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}
      </FadeInCard>
    );
  };

  // Hero emoji - use test icon emoji if available
  const heroEmoji = testConfig?.iconEmoji || config.heroEmojis[0];

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
            <motion.div
              animate={{ 
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut'
              }}
              style={{
                fontSize: '48px',
                display: 'inline-block',
                filter: 'drop-shadow(0 2px 8px rgba(33, 150, 243, 0.4))',
              }}
            >
              {heroEmoji}
            </motion.div>
          </div>
          {content.title ? (() => {
            // Parse title: "DEVELOPING — Cognitive-Science Based Growth Plan (10 Titles + Guides)"
            // Remove any leading icons/emojis
            const cleanTitle = content.title.replace(/^[⭐🌟✨🎯💫🔮]\s*/, '');
            
            // Check if title contains "DEVELOPING", "GOOD", or "EXCELLENT" followed by — or -
            const levelMatch = cleanTitle.match(/^(DEVELOPING|GOOD|EXCELLENT)\s*[—–-]\s*(.+)$/i);
            
            if (levelMatch) {
              const levelText = levelMatch[1].toUpperCase();
              const restText = levelMatch[2];
              
              // Color mapping for different levels
              const levelColors: Record<string, string> = {
                'DEVELOPING': '#10B981', // Green
                'GOOD': '#3B82F6',       // Blue
                'EXCELLENT': '#8B5CF6',  // Purple
              };
              
              const levelColor = levelColors[levelText] || '#10B981';
              
              return (
                <div style={{
                  marginBottom: content.summary ? '12px' : '16px',
                }}>
                  <h1 style={{
                    fontSize: isMobile ? '36px' : '48px',
                    fontWeight: '900',
                    color: levelColor,
                    margin: 0,
                    marginBottom: '8px',
                    lineHeight: '1.2',
                  }}>
                    {levelText}
                  </h1>
                  <p style={{
                    fontSize: isMobile ? '18px' : '22px',
                    fontWeight: '600',
                    color: '#666',
                    margin: 0,
                    lineHeight: '1.4',
                  }}>
                    {restText}
                  </p>
                </div>
              );
            }
            
            // Fallback: show title with gradient
            return (
              <h1 style={{
                fontSize: isMobile ? '32px' : '42px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: content.summary ? '12px' : '16px',
              }}>
                {cleanTitle}
              </h1>
            );
          })() : (
          <h1 style={{
            fontSize: isMobile ? '32px' : '42px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
              marginBottom: content.summary ? '12px' : '16px',
          }}>
            {currentLocale === 'tr' 
              ? `Detaylı ${testName} Raporunuz`
              : `Your Detailed ${testName} Report`}
          </h1>
          )}
          {content.summary && (
          <p style={{
              fontSize: isMobile ? '14px' : '16px',
            color: '#666',
            lineHeight: '1.6',
              opacity: 0.8,
          }}>
              {content.summary}
          </p>
          )}
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
            color: '#2196F3',
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
              background: 'linear-gradient(135deg, #2196F3 0%, #64B5F6 100%)',
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

