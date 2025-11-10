import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useMobile } from '../../hooks/useMobile';
import '../../App.css';

interface Props {
  onStart: () => void;
}

// 16 Personality Types with icons and nicknames
// Sorted by groups: IN, EN, IS, ES (each group in one row)
const personalityTypes = [
  // IN group (Row 1)
  { type: 'INFP', icon: '🌸', nickname: 'The Mediator' },
  { type: 'INFJ', icon: '🌙', nickname: 'The Advocate' },
  { type: 'INTP', icon: '💭', nickname: 'The Thinker' },
  { type: 'INTJ', icon: '🧠', nickname: 'The Mastermind' },
  // EN group (Row 2)
  { type: 'ENFP', icon: '🔥', nickname: 'The Campaigner' },
  { type: 'ENFJ', icon: '🌻', nickname: 'The Teacher' },
  { type: 'ENTP', icon: '⚡', nickname: 'The Visionary' },
  { type: 'ENTJ', icon: '⚔️', nickname: 'The Commander' },
  // IS group (Row 3)
  { type: 'ISFP', icon: '🎨', nickname: 'The Artist' },
  { type: 'ISFJ', icon: '🌿', nickname: 'The Protector' },
  { type: 'ISTP', icon: '🛠️', nickname: 'The Crafter' },
  { type: 'ISTJ', icon: '📘', nickname: 'The Inspector' },
  // ES group (Row 4)
  { type: 'ESFP', icon: '💃', nickname: 'The Performer' },
  { type: 'ESFJ', icon: '🤝', nickname: 'The Caregiver' },
  { type: 'ESTP', icon: '🚀', nickname: 'The Entrepreneur' },
  { type: 'ESTJ', icon: '🧩', nickname: 'The Organizer' },
];

function PersonalityIntro({ onStart }: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF4F0 0%, #FBEAFF 100%)',
      paddingTop: isMobile ? '100px' : '100px', // Reduced from 120px/128px to move content up
      paddingBottom: isMobile ? '40px' : '48px', // mb-12 equivalent
      paddingLeft: isMobile ? '20px' : '40px',
      paddingRight: isMobile ? '20px' : '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <h1 style={{
            fontSize: isMobile ? '36px' : '48px',
            marginBottom: '12px',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('tests.personality.landing.title')}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'rgba(255, 143, 163, 0.1)',
              padding: '20px',
              borderRadius: '16px',
              marginTop: '16px',
              marginBottom: '32px',
              border: '1px solid rgba(255, 143, 163, 0.2)',
            }}
          >
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#555',
              lineHeight: '1.5',
              textAlign: 'center',
              margin: '0 0 6px 0',
            }}>
              {t('tests.personality.landing.subtitle_part1')}
            </p>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#555',
              lineHeight: '1.5',
              textAlign: 'center',
              margin: 0,
            }}>
              {t('tests.personality.landing.subtitle_part2')}
            </p>
          </motion.div>
        </motion.div>

        {/* Personality Types Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: '32px' }}
        >
          <h2 style={{
            fontSize: isMobile ? '18px' : '22px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {t('tests.personality.landing.personalities_title')}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile 
              ? 'repeat(2, 1fr)' 
              : 'repeat(4, 1fr)',
            gap: '16px', // gap-4 equivalent (1rem = 16px)
            maxWidth: '80rem', // max-w-5xl equivalent (80rem = 1280px)
            margin: '0 auto',
            marginTop: '0', // Reduced top margin
          }}>
            {personalityTypes.map((personality, index) => (
              <motion.div
                key={personality.type}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '16px', // rounded-2xl
                  padding: isMobile ? '12px 8px' : '16px 12px', // Reduced padding
                  textAlign: 'center',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // shadow-sm
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 143, 163, 0.1)',
                }}
              >
                <div style={{
                  fontSize: isMobile ? '20px' : '24px', // text-2xl (reduced from 36px)
                  marginBottom: '4px',
                }}>
                  {personality.icon}
                </div>
                <div style={{
                  fontSize: isMobile ? '12px' : '14px', // text-sm (reduced from 16px)
                  fontWeight: 'bold',
                  color: '#FF8FA3',
                  marginBottom: '2px',
                }}>
                  {personality.type}
                </div>
                <div style={{
                  fontSize: isMobile ? '10px' : '12px', // text-xs (already correct)
                  color: '#666',
                }}>
                  {personality.nickname}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ 
            textAlign: 'center',
            marginTop: '40px',
            marginBottom: '24px', // Ensure button is visible
          }}
        >
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: isMobile ? '18px' : '20px',
              padding: isMobile ? '16px 40px' : '18px 48px',
              background: 'linear-gradient(135deg, #FF8FA3 0%, #FFC078 100%)',
              border: 'none',
              borderRadius: '16px',
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255, 143, 163, 0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            {t('tests.personality.landing.start_test')}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default PersonalityIntro;

