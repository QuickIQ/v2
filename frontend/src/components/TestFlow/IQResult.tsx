import { useTranslation } from 'react-i18next';
import '../../App.css';

interface Props {
  score: number;
  result: any;
}

function IQResult({ score }: Props) {
  const { t } = useTranslation();

  const getTier = (score: number) => {
    if (score >= 130) return { label: t('test.iq.excellent'), color: '#27ae60' };
    if (score >= 115) return { label: t('test.iq.good'), color: '#3498db' };
    if (score >= 85) return { label: t('test.iq.average'), color: '#f39c12' };
    return { label: t('test.iq.belowAverage'), color: '#e74c3c' };
  };

  const tier = getTier(score);

  return (
    <div>
      <div style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>
        {t('test.iq.score')}
      </div>
      <div
        style={{
          fontSize: '72px',
          fontWeight: 'bold',
          color: tier.color,
          marginBottom: '24px',
        }}
      >
        {score}
      </div>
      <div
        style={{
          display: 'inline-block',
          padding: '8px 24px',
          background: tier.color,
          color: 'white',
          borderRadius: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '32px',
        }}
      >
        {tier.label}
      </div>

      <div style={{ textAlign: 'left', marginTop: '40px', padding: '24px', background: '#f8f9fa', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#333' }}>
          {t('test.iq.interpretation')}
        </h3>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
          {score >= 130 && 'Your IQ score indicates exceptional cognitive ability. You demonstrate superior reasoning, problem-solving skills, and intellectual capacity.'}
          {score >= 115 && score < 130 && 'Your IQ score shows above-average intelligence. You have strong analytical thinking and learning capabilities.'}
          {score >= 85 && score < 115 && 'Your IQ score falls within the average range. This represents typical cognitive functioning and is normal for the general population.'}
          {score < 85 && 'Your IQ score is below average. Consider consulting with professionals for further assessment and support.'}
        </p>
      </div>
    </div>
  );
}

export default IQResult;

