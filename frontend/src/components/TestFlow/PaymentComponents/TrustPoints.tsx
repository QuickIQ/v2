import { TrustPoint } from './TrustPoint';
import trustPointsData from '../../../data/shared/trust-points.json';

interface TrustPointsProps {
  language: 'en' | 'tr';
}

export function TrustPoints({ language }: TrustPointsProps) {
  const trustPoints = trustPointsData.points;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      {trustPoints.map((point, index) => (
        <TrustPoint
          key={point.key}
          emoji={point.emoji}
          title={point.title[language] || point.title.en}
          description={point.description[language] || point.description.en}
          index={index}
        />
      ))}
    </div>
  );
}

