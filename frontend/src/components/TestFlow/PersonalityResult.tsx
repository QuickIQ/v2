import { useTranslation } from 'react-i18next';
import personalityDescriptionsData from '../../data/tests/personality/descriptions.json';
import '../../App.css';

interface Props {
  type: string;
  result: any;
}

// Load personality descriptions from JSON
const personalityDescriptions = personalityDescriptionsData.descriptions;

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

