import { useMemo } from 'react';
import { TestCard } from '../ui/TestCard';
import { getAllTestConfigs } from '../../utils/testContentLoader';
import './CategoryTests.css';

export function BusinessTests() {
  // Get only Business category tests
  const businessTests = useMemo(() => {
    const allTests = getAllTestConfigs();
    return allTests.filter(test => 
      test.category === 'Business' || 
      test.category.toLowerCase() === 'business'
    );
  }, []);

  if (businessTests.length === 0) {
    return (
      <div className="category-tests-empty">
        <p>No Business tests available.</p>
      </div>
    );
  }

  return (
    <div className="category-tests-container fade-in">
      <div className="category-tests-grid">
        {businessTests.map((test, index) => (
          <TestCard key={test.id} test={test} index={index} />
        ))}
      </div>
    </div>
  );
}

