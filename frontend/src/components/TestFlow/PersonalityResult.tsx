import { useTranslation } from 'react-i18next';
import '../../App.css';

interface Props {
  type: string;
  result: any;
}

const personalityDescriptions: Record<string, any> = {
  INTJ: {
    name: 'The Architect',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
  },
  INTP: {
    name: 'The Thinker',
    description: 'Innovative inventors with an unquenchable thirst for knowledge.',
  },
  ENTJ: {
    name: 'The Commander',
    description: 'Bold, imaginative and strong-willed leaders.',
  },
  ENTP: {
    name: 'The Debater',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
  },
  INFJ: {
    name: 'The Advocate',
    description: 'Creative and insightful, inspired and independent perfectionists.',
  },
  INFP: {
    name: 'The Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help a good cause.',
  },
  ENFJ: {
    name: 'The Protagonist',
    description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
  },
  ENFP: {
    name: 'The Campaigner',
    description: 'Enthusiastic, creative and sociable free spirits.',
  },
  ISTJ: {
    name: 'The Logistician',
    description: 'Practical and fact-minded, reliable and responsible.',
  },
  ISFJ: {
    name: 'The Protector',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
  },
  ESTJ: {
    name: 'The Executive',
    description: 'Excellent administrators, unsurpassed at managing things or people.',
  },
  ESFJ: {
    name: 'The Consul',
    description: 'Extraordinarily caring, social and popular people, always eager to help.',
  },
  ISTP: {
    name: 'The Virtuoso',
    description: 'Bold and practical experimenters, masters of all kinds of tools.',
  },
  ISFP: {
    name: 'The Adventurer',
    description: 'Flexible and charming artists, always ready to explore new possibilities.',
  },
  ESTP: {
    name: 'The Entrepreneur',
    description: 'Smart, energetic and perceptive people, true to the moment.',
  },
  ESFP: {
    name: 'The Entertainer',
    description: 'Spontaneous, energetic and enthusiastic people – life is never boring around them.',
  },
};

function PersonalityResult({ type }: Props) {
  const { t } = useTranslation();
  const info = personalityDescriptions[type] || {
    name: type,
    description: 'Your unique personality type.',
  };

  return (
    <div>
      <div style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>
        {t('test.personality.type')}
      </div>
      <div
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: '#667eea',
          marginBottom: '16px',
          letterSpacing: '8px',
        }}
      >
        {type}
      </div>
      <div style={{ fontSize: '24px', color: '#333', marginBottom: '32px', fontWeight: '600' }}>
        {info.name}
      </div>

      <div style={{ textAlign: 'left', marginTop: '32px' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>
          {t('test.personality.description')}
        </h3>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666', marginBottom: '24px' }}>
          {info.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '32px' }}>
          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#333' }}>
              {t('test.personality.strengths')}
            </h4>
            <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <li>Analytical thinking</li>
              <li>Creative problem-solving</li>
              <li>Independent work style</li>
            </ul>
          </div>

          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#333' }}>
              {t('test.personality.weaknesses')}
            </h4>
            <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <li>Can be overly critical</li>
              <li>May struggle with routine</li>
              <li>Perfectionist tendencies</li>
            </ul>
          </div>

          <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '18px', marginBottom: '12px', color: '#333' }}>
              {t('test.personality.careers')}
            </h4>
            <ul style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <li>Software Developer</li>
              <li>Research Scientist</li>
              <li>Strategic Planner</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalityResult;

