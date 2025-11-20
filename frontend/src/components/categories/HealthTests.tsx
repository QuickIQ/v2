import { useMemo } from 'react';
import { TestCard } from '../ui/TestCard';
import { getAllTestConfigs } from '../../utils/testContentLoader';
import './CategoryTests.css';

export function HealthTests() {
  // Get only Health category tests
  const healthTests = useMemo(() => {
    const allTests = getAllTestConfigs();
    return allTests.filter(test => 
      test.category === 'Health' || 
      test.category.toLowerCase() === 'health'
    );
  }, []);

  if (healthTests.length === 0) {
    return (
      <div className="category-tests-empty">
        <p>No Health tests available.</p>
      </div>
    );
  }

  return (
    <div className="category-tests-container fade-in">
      <div className="category-tests-grid">
        {healthTests.map((test, index) => (
          <TestCard key={test.id} test={test} index={index} />
        ))}
      </div>
    </div>
  );
}

