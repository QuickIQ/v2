import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import { Twitter, Instagram, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import '../../App.css';

interface PersonalityResultData {
  title: string;
  subtitle: string;
  core_characteristics: string[];
  strengths: string[];
  challenges: string[];
  ideal_careers: {
    [key: string]: string[];
  };
  future_roles: string[];
  famous_examples: string[];
  closing_quote: string;
}

interface Props {
  personalityType: string;
  resultData: PersonalityResultData;
}

function PersonalityResultPage({ personalityType, resultData }: Props) {
  const { t } = useTranslation();
  const isMobile = useMobile();
  const [linkCopied, setLinkCopied] = useState(false);

  const shareUrl = `${window.location.origin}/test/personality?type=${personalityType}`;
  const shareText = `I'm a ${personalityType}! Discover your personality type: ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleInstagramShare = () => {
    handleCopyLink();
    alert('Link copied! Paste it in your Instagram story or post.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
      padding: isMobile ? '20px' : '40px',
      paddingTop: isMobile ? '80px' : '100px',
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header - Left Column Style */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{
            marginBottom: '30px',
            padding: isMobile ? '30px 20px' : '40px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.15)',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '20px' : '40px',
          }}>
            {/* Left Column - Title & Subtitle */}
            <div style={{ flex: isMobile ? '1' : '0 0 300px', textAlign: isMobile ? 'center' : 'left' }}>
              <h1 style={{
                fontSize: isMobile ? '32px' : '48px',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 'bold',
              }}>
                {resultData.title}
              </h1>
              <p style={{
                fontSize: isMobile ? '18px' : '22px',
                color: '#666',
                fontStyle: 'italic',
                lineHeight: '1.4',
              }}>
                {resultData.subtitle}
              </p>
            </div>

            {/* Right Column - Type Badge */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-end',
            }}>
              <div style={{
                padding: '20px 40px',
                background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
                borderRadius: '16px',
                color: 'white',
                fontSize: isMobile ? '24px' : '32px',
                fontWeight: 'bold',
                boxShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
              }}>
                {personalityType}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Middle Section - Content Cards with Color Coding */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '24px',
          marginBottom: '30px',
        }}>
          {/* Core Characteristics - Blue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
            style={{
              padding: '30px',
              background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(33, 150, 243, 0.2)',
              border: '2px solid rgba(33, 150, 243, 0.3)',
            }}
          >
            <h3 style={{
              fontSize: '24px',
              marginBottom: '20px',
              color: '#1976D2',
              fontWeight: 'bold',
            }}>
              {t('tests.personality.results.sections.core_characteristics')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {resultData.core_characteristics.map((char, index) => (
                <li key={index} style={{
                  padding: '12px',
                  marginBottom: '8px',
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#333',
                }}>
                  • {char}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Strengths - Green */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
            style={{
              padding: '30px',
              background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(76, 175, 80, 0.2)',
              border: '2px solid rgba(76, 175, 80, 0.3)',
            }}
          >
            <h3 style={{
              fontSize: '24px',
              marginBottom: '20px',
              color: '#388E3C',
              fontWeight: 'bold',
            }}>
              {t('tests.personality.results.sections.strengths')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {resultData.strengths.map((strength, index) => (
                <li key={index} style={{
                  padding: '12px',
                  marginBottom: '8px',
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#333',
                }}>
                  ✓ {strength}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Challenges - Yellow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
            style={{
              padding: '30px',
              background: 'linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%)',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(255, 193, 7, 0.2)',
              border: '2px solid rgba(255, 193, 7, 0.3)',
            }}
          >
            <h3 style={{
              fontSize: '24px',
              marginBottom: '20px',
              color: '#F57C00',
              fontWeight: 'bold',
            }}>
              {t('tests.personality.results.sections.challenges')}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {resultData.challenges.map((challenge, index) => (
                <li key={index} style={{
                  padding: '12px',
                  marginBottom: '8px',
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#333',
                }}>
                  → {challenge}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ideal Careers - Purple */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
            style={{
              padding: '30px',
              background: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
              borderRadius: '20px',
              boxShadow: '0 4px 16px rgba(156, 39, 176, 0.2)',
              border: '2px solid rgba(156, 39, 176, 0.3)',
            }}
          >
            <h3 style={{
              fontSize: '24px',
              marginBottom: '20px',
              color: '#7B1FA2',
              fontWeight: 'bold',
            }}>
              {t('tests.personality.results.sections.ideal_careers')}
            </h3>
            {Object.entries(resultData.ideal_careers).map(([category, careers]) => (
              <div key={category} style={{ marginBottom: '16px' }}>
                <h4 style={{
                  fontSize: '16px',
                  marginBottom: '8px',
                  color: '#7B1FA2',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                }}>
                  {category}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {careers.map((career, index) => (
                    <span key={index} style={{
                      padding: '8px 16px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: '20px',
                      fontSize: '14px',
                      color: '#7B1FA2',
                      fontWeight: '500',
                    }}>
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Future Roles - Violet (Full Width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
          style={{
            marginBottom: '30px',
            padding: '30px',
            background: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(103, 58, 183, 0.2)',
            border: '2px solid rgba(103, 58, 183, 0.3)',
          }}
        >
          <h3 style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: '#512DA8',
            fontWeight: 'bold',
          }}>
            {t('tests.personality.results.sections.future_roles')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {resultData.future_roles.map((role, index) => (
              <div key={index} style={{
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '12px',
                fontSize: '16px',
                color: '#512DA8',
                fontWeight: '500',
              }}>
                {role}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Famous Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
          style={{
            marginBottom: '30px',
            padding: '30px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: '#ec4899',
            fontWeight: 'bold',
          }}>
            {t('tests.personality.results.sections.famous_examples')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {resultData.famous_examples.map((example, index) => (
              <div key={index} style={{
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #FFB6C1 0%, #FFD6A5 100%)',
                borderRadius: '12px',
                fontSize: '16px',
                color: '#333',
                fontWeight: '500',
              }}>
                {example}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Closing Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
          style={{
            marginBottom: '30px',
            padding: '30px',
            background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.3)',
            textAlign: 'center',
          }}
        >
          <h3 style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: 'white',
            fontWeight: 'bold',
          }}>
            {t('tests.personality.results.sections.closing_quote')}
          </h3>
          <p style={{
            fontSize: '18px',
            color: 'white',
            lineHeight: '1.6',
            fontStyle: 'italic',
            opacity: 0.95,
          }}>
            {resultData.closing_quote}
          </p>
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card"
          style={{
            marginBottom: '30px',
            padding: '30px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3 style={{
            fontSize: '24px',
            marginBottom: '20px',
            color: '#333',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            {t('tests.personality.results.share.title')}
          </h3>
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <button
              onClick={handleTwitterShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#1DA1F2',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(29, 161, 242, 0.3)',
              }}
            >
              <Twitter size={20} />
              {t('tests.personality.results.share.twitter')}
            </button>
            <button
              onClick={handleInstagramShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(225, 48, 108, 0.3)',
              }}
            >
              <Instagram size={20} />
              {t('tests.personality.results.share.instagram')}
            </button>
            <button
              onClick={handleCopyLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: linkCopied ? '#10b981' : '#ec4899',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
              }}
            >
              {linkCopied ? <Check size={20} /> : <Copy size={20} />}
              {linkCopied ? t('tests.personality.results.share.link_copied') : t('tests.personality.results.share.copy_link')}
            </button>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '40px',
          }}
        >
          <Link
            to="/test/personality"
            className="btn btn-secondary"
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '12px',
            }}
          >
            {t('tests.personality.results.actions.retake')}
          </Link>
          <Link
            to="/"
            className="btn btn-primary"
            style={{
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ec4899 0%, #fb923c 100%)',
              border: 'none',
            }}
          >
            {t('tests.personality.results.actions.home')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default PersonalityResultPage;
