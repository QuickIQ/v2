import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadTestTranslations } from '../i18n/config';
import i18n from '../i18n/config';

/**
 * Hook to dynamically load test-specific translations based on the current route
 * 
 * NOTE: Most tests now use JSON content files instead of i18n files.
 * Only tests that still use i18n files (personality, iqtest) will load translations.
 * 
 * Detects test name from URL path and loads the appropriate translation file
 * Example: /test/personality -> loads personality translations
 */
export function useDynamicTestTranslations() {
  const location = useLocation();
  const lng = i18n.language || 'en';

  useEffect(() => {
    // Extract test name from path
    // Examples: /test/personality -> personality, /test/iq -> iq
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const testIndex = pathSegments.indexOf('test');
    
    if (testIndex !== -1 && pathSegments[testIndex + 1]) {
      const testName = pathSegments[testIndex + 1];
      
      // Only load i18n translations for tests that still use i18n files
      // All other tests now use JSON content files (contents/*.json)
      const testsWithI18n = ['personality', 'iq', 'iqtest'];
      
      if (testsWithI18n.includes(testName)) {
        // Normalize test name (e.g., 'iqtest' -> 'iq')
        const normalizedTestName = testName === 'iqtest' ? 'iq' : testName;
        loadTestTranslations(normalizedTestName, lng);
      }
      // For all other tests, translations are loaded from JSON content files
      // via UniversalLandingPage and UniversalAnalyzingPage components
    }
  }, [location.pathname, lng]);
}



