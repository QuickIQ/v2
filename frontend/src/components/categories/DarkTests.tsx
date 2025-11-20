import { useMemo } from 'react';
import { TestCard } from '../ui/TestCard';
import { getAllTestConfigs } from '../../utils/testContentLoader';
import './CategoryTests.css';

export function DarkTests() {
  // Get only Dark category tests
  const darkTests = useMemo(() => {
    const allTests = getAllTestConfigs();
    return allTests.filter(test => 
      test.category === 'Dark' || 
      test.category.toLowerCase() === 'dark'
    );
  }, []);

  if (darkTests.length === 0) {
    return (
      <div className="category-tests-empty">
        <p>No Dark tests available.</p>
      </div>
    );
  }

  return (
    <div className="category-tests-container fade-in">
      <div className="category-tests-grid">
        {darkTests.map((test, index) => (
          <TestCard key={test.id} test={test} index={index} />
        ))}
      </div>
    </div>
  );
}

