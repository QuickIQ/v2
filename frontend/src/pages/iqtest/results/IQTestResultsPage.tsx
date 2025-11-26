import { useSearchParams } from 'react-router-dom';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Level4 from './Level4';
import Level5 from './Level5';

export default function IQTestResultsPage() {
  const [searchParams] = useSearchParams();
  
  // Read score from URL
  const score = Number(searchParams.get("score"));
  
  // Determine Level
  let level: number | null = null;
  
  if (score >= 65 && score <= 94) level = 1;      // Developing Logic
  else if (score >= 95 && score <= 109) level = 2; // Emerging Reasoning
  else if (score >= 110 && score <= 124) level = 3; // Strong Analytical Mind
  else if (score >= 125 && score <= 139) level = 4; // Advanced Cognitive Ability
  else if (score >= 140 && score <= 145) level = 5; // Elite IQ Tier
  
  // If no valid score or level, show error
  if (!score || !level) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FBEAFF 0%, #FFF4F0 100%)',
        padding: '40px',
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '16px' }}>Invalid Score</h2>
          <p style={{ color: '#666' }}>Please complete the test to see your results.</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {level === 1 && <Level1 score={score} />}
      {level === 2 && <Level2 score={score} />}
      {level === 3 && <Level3 score={score} />}
      {level === 4 && <Level4 score={score} />}
      {level === 5 && <Level5 score={score} />}
    </>
  );
}
