import { useState, useEffect } from 'react';
import { getTestStore } from '../utils/testPageFactory';

interface UseTestStoreResult {
  useTestStore: any | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to dynamically load test store based on testId
 * @param testId - The test identifier
 * @returns Object containing useTestStore hook, loading state, and error state
 */
export function useTestStore(testId: string): UseTestStoreResult {
  const [useTestStore, setUseTestStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadStore() {
      try {
        setLoading(true);
        setError(null);
        const store = await getTestStore(testId);
        if (isMounted) {
          setUseTestStore(() => store);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || `Failed to load store for test: ${testId}`);
          setLoading(false);
        }
      }
    }

    if (testId) {
      loadStore();
    } else {
      setLoading(false);
      setError('Test ID is required');
    }

    return () => {
      isMounted = false;
    };
  }, [testId]);

  return { useTestStore, loading, error };
}

