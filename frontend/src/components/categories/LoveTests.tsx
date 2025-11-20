import { useMemo } from 'react';
import { TestCard } from '../ui/TestCard';
import { getAllTestConfigs } from '../../utils/testContentLoader';
import './CategoryTests.css';

export function LoveTests() {
  // Get only Love category tests
  const loveTests = useMemo(() => {
    const allTests = getAllTestConfigs();
    return allTests.filter(test => 
      test.category === 'Love' || 
      test.category.toLowerCase() === 'love'
    );
  }, []);

  if (loveTests.length === 0) {
    return (
      <div className="category-tests-empty">
        <p>No Love tests available.</p>
      </div>
    );
  }

  return (
    <div className="category-tests-container fade-in">
      <div className="category-tests-grid">
        {loveTests.map((test, index) => (
          <TestCard key={test.id} test={test} index={index} />
        ))}
      </div>
    </div>
  );
}

