import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../../hooks/useMobile';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../../../App.css';

// FadeInCard component - animates once on first view, then stays static
interface FadeInCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const FadeInCard = ({ children, delay = 0, className, style }: FadeInCardProps) => {
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
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Type configuration for emojis and section icons
const typeConfig: Record<string, {
  heroEmojis: string[];
  sectionEmojis: string[];
  strengthsInsights?: Array<{ emoji: string; phrase: string; text: string }>;
  challengesInsights?: Array<{ emoji: string; phrase: string; text: string }>;
}> = {
  INFP: {
    heroEmojis: ['🌸', '💭', '🎨'],
    sectionEmojis: ['🌸', '💫', '🌿', '⚠️', '🌍', '🌱', '🔮', '📆', '🎭', '💖'],
    strengthsInsights: [
      { emoji: '💎', phrase: 'Empathic Insight', text: 'You sense truth beneath words. People feel seen by you.' },
      { emoji: '🌿', phrase: 'Creative Expression', text: 'You don\'t just create art — you become it.' },
      { emoji: '🕊', phrase: 'Compassionate Influence', text: 'You change others through authenticity and resonance.' },
      { emoji: '🧭', phrase: 'Moral Integrity', text: 'You hold onto your values even when the world doesn\'t.' },
    ],
    challengesInsights: [
      { emoji: '💔', phrase: 'Emotional Overwhelm', text: 'Your empathy is powerful — but needs boundaries.' },
      { emoji: '🌫', phrase: 'Idealism vs Reality', text: 'Learning to balance hope with realism is your art.' },
      { emoji: '🌀', phrase: 'Self-Criticism', text: 'You may hold yourself to impossible moral standards.' },
      { emoji: '🌑', phrase: 'Inconsistency', text: 'When passion fades, motivation can collapse.' },
    ],
  },
  ENFP: {
    heroEmojis: ['🔥', '✨', '🌻'],
    sectionEmojis: ['🔥', '🌈', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  INFJ: {
    heroEmojis: ['🌙', '🔮', '💫'],
    sectionEmojis: ['🌙', '💫', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ENFJ: {
    heroEmojis: ['🌻', '💫', '🌟'],
    sectionEmojis: ['🌟', '💫', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  INTJ: {
    heroEmojis: ['🧠', '⚙️', '📈'],
    sectionEmojis: ['🧠', '⚙️', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ENTJ: {
    heroEmojis: ['⚔️', '🏆', '📊'],
    sectionEmojis: ['⚔️', '💼', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  INTP: {
    heroEmojis: ['💭', '🔬', '🧩'],
    sectionEmojis: ['💭', '🔬', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ENTP: {
    heroEmojis: ['⚡', '💡', '🎯'],
    sectionEmojis: ['⚡', '💡', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ISFP: {
    heroEmojis: ['🎨', '🍃', '💫'],
    sectionEmojis: ['🎨', '🍃', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ESFP: {
    heroEmojis: ['💃', '🎉', '✨'],
    sectionEmojis: ['🎉', '🌈', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ISFJ: {
    heroEmojis: ['🌿', '🛡️', '💝'],
    sectionEmojis: ['🌿', '🛡️', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ESFJ: {
    heroEmojis: ['🤝', '💝', '🌟'],
    sectionEmojis: ['🤝', '💝', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ISTP: {
    heroEmojis: ['🛠️', '⚙️', '🔧'],
    sectionEmojis: ['🛠️', '⚙️', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ESTP: {
    heroEmojis: ['🚀', '⚡', '🎯'],
    sectionEmojis: ['🚀', '⚡', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ISTJ: {
    heroEmojis: ['📘', '📊', '🏛️'],
    sectionEmojis: ['🏛️', '⚙️', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
  ESTJ: {
    heroEmojis: ['🧩', '🏆', '📊'],
    sectionEmojis: ['🧩', '💼', '💪', '⚠️', '🌍', '🌱', '🔮', '📆', '🌟', '💖'],
  },
};

interface PersonalityUnlockTemplateProps {
  type: string;
}

export default function PersonalityUnlockTemplate({ type }: PersonalityUnlockTemplateProps) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const navigate = useNavigate();

  const typeUpper = type.toUpperCase();
  const typeLower = type.toLowerCase();
  const config = typeConfig[typeUpper] || typeConfig.INFP; // Fallback to INFP if type not found

  // No scroll snap - free scrolling after cards are revealed

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
    'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 250, 250, 0.95) 100%)',
    'linear-gradient(135deg, rgba(255, 245, 245, 0.95) 0%, rgba(255, 240, 240, 0.95) 100%)',
    'linear-gradient(135deg, rgba(255, 250, 240, 0.95) 0%, rgba(255, 245, 235, 0.95) 100%)',
  ];

  // Get insights or use defaults
  const strengthsInsights = config.strengthsInsights || [
    { emoji: '💎', phrase: 'Key Strength', text: 'Your unique abilities shine through.' },
    { emoji: '🌿', phrase: 'Natural Talent', text: 'You excel in areas that matter to you.' },
    { emoji: '🕊', phrase: 'Positive Impact', text: 'You make a difference in others\' lives.' },
    { emoji: '🧭', phrase: 'Core Value', text: 'You stay true to your principles.' },
  ];

  const challengesInsights = config.challengesInsights || [
    { emoji: '💔', phrase: 'Growth Area', text: 'An opportunity to develop further.' },
    { emoji: '🌫', phrase: 'Challenge', text: 'Something to work on over time.' },
    { emoji: '🌀', phrase: 'Learning Curve', text: 'A chance to expand your skills.' },
    { emoji: '🌑', phrase: 'Awareness', text: 'Understanding this helps you grow.' },
  ];

  // Helper function to get translation key
  const getKey = (section: number, field: 'title' | 'text') => {
    return `tests.personality.unlock.${typeLower}.section${section}.${field}`;
  };

  // Render section card
  const renderSection = (sectionNum: number, delay: number) => {
    const emoji = config.sectionEmojis[sectionNum - 1] || '🌟';
    const gradientIndex = (sectionNum - 1) % 3;

    return (
      <FadeInCard
        key={sectionNum}
        delay={delay}
          style={{
            background: cardGradients[gradientIndex],
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '32px',
            padding: isMobile ? '32px 24px' : '40px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(255, 182, 193, 0.2)',
          }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <span style={{ fontSize: '32px' }}>{emoji}</span>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #FF7B8A 0%, #FFAF6D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}>
            {t(getKey(sectionNum, 'title')) || `Section ${sectionNum}`}
          </h2>
        </div>
        <div style={{ 
          color: '#555', 
          lineHeight: '1.8', 
          fontSize: '15px', 
          whiteSpace: 'pre-line',
          marginBottom: (sectionNum === 3 || sectionNum === 4) ? '32px' : '0',
        }}>
          <p>{t(getKey(sectionNum, 'text')) || ''}</p>
        </div>

        {/* Mini Insight Cards for Strengths (Section 3) */}
        {sectionNum === 3 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '24px',
          }}>
            {strengthsInsights.map((insight, index) => (
              <FadeInCard
                key={index}
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(255, 182, 193, 0.15)',
                    transition: 'all 0.3s ease',
                  }}
                >
                <div style={{
                  fontSize: '28px',
                  marginBottom: '8px',
                }}>
                  {insight.emoji}
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '6px',
                }}>
                  {insight.phrase}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  lineHeight: '1.5',
                  margin: 0,
                }}>
                  {insight.text}
                </p>
                </motion.div>
              </FadeInCard>
            ))}
          </div>
        )}

        {/* Mini Insight Cards for Challenges (Section 4) */}
        {sectionNum === 4 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '16px',
            marginTop: '24px',
          }}>
            {challengesInsights.map((insight, index) => (
              <FadeInCard
                key={index}
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(255, 182, 193, 0.15)',
                    transition: 'all 0.3s ease',
                  }}
                >
                <div style={{
                  fontSize: '28px',
                  marginBottom: '8px',
                }}>
                  {insight.emoji}
                </div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#333',
                  marginBottom: '6px',
                }}>
                  {insight.phrase}
                </h3>
                <p style={{
                  fontSize: '13px',
                  color: '#666',
                  lineHeight: '1.5',
                  margin: 0,
                }}>
                  {insight.text}
                </p>
                </motion.div>
              </FadeInCard>
            ))}
          </div>
        )}
      </FadeInCard>
    );
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #FFE8E2 0%, #FFF6F3 50%, #FFF9F5 100%)',
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
            background: 'linear-gradient(135deg, #FF7B8A 0%, #FFAF6D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}>
            {t(`tests.personality.unlock.${typeUpper}.title`) || `Your ${typeUpper} Personality Detailed Report`}
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            lineHeight: '1.6',
          }}>
            {t(`tests.personality.unlock.${typeUpper}.subtitle`) || 'Based on your unique traits, here\'s a deep dive into your core potential and growth path.'}
          </p>
        </FadeInCard>

        {/* Section Cards */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '24px' : '32px',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sectionNum, index) => 
            renderSection(sectionNum, index * 0.1)
          )}
        </div>

        {/* Updated CTA Section */}
        <FadeInCard
          delay={0.5}
          style={{
            background: 'linear-gradient(135deg, #FFF4F1 0%, #FFE8E2 100%)',
            borderRadius: '32px',
            padding: isMobile ? '40px 24px' : '48px',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 182, 193, 0.3)',
            marginTop: isMobile ? '32px' : '48px',
          }}
        >
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}>
            🌟
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #FF7B8A 0%, #FFAF6D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}>
            {t(`tests.personality.unlock.${typeUpper}.cta.explore_title`) || 'Ready to Explore More?'}
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.6',
          }}>
            {t(`tests.personality.unlock.${typeUpper}.cta.explore_subtitle`) || 'Discover other personality & intelligence tests to deepen your insight.'}
          </p>
          <motion.button
            onClick={scrollToTests}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: isMobile ? '16px 32px' : '18px 40px',
              background: 'linear-gradient(135deg, #FF7B8A 0%, #FFAF6D 100%)',
              border: 'none',
              borderRadius: '999px',
              color: 'white',
              fontWeight: '700',
              fontSize: isMobile ? '16px' : '18px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(255, 123, 138, 0.4)',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Sparkles size={20} />
            {t(`tests.personality.unlock.${typeUpper}.cta.explore_button`) || 'Explore Other Tests'}
          </motion.button>
        </FadeInCard>
      </div>
    </main>
  );
}

