import { useMemo } from 'react';
import { TestCard } from '../ui/TestCard';
import { getAllTestConfigs } from '../../utils/testContentLoader';
import './CategoryTests.css';

export function MoneyTests() {
  // Get only Money category tests
  const moneyTests = useMemo(() => {
    const allTests = getAllTestConfigs();
    return allTests.filter(test => 
      test.category === 'Money' || 
      test.category.toLowerCase() === 'money'
    );
  }, []);

  if (moneyTests.length === 0) {
    return (
      <div className="category-tests-empty">
        <p>No Money tests available.</p>
      </div>
    );
  }

  return (
    <div className="category-tests-container fade-in">
      <div className="category-tests-grid">
        {moneyTests.map((test, index) => (
          <TestCard key={test.id} test={test} index={index} />
        ))}
      </div>
    </div>
  );
}

