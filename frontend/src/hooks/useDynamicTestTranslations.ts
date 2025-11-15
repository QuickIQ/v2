import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadTestTranslations } from '../i18n/config';
import i18n from '../i18n/config';

/**
 * Hook to dynamically load test-specific translations based on the current route
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
      
      // List of valid test names
        const validTests = ['personality', 'iq', 'iqtest', 'focus', 'memory', 'creative-thinking', 'depression', 'multitasking', 'attention-span', 'memory-retention', 'anxiety', 'problem-solving', 'entrepreneur-mindset', 'risk-tolerance', 'strategic-thinking', 'time-management', 'decision-making', 'leadership-archetype', 'negotiation-skills', 'stress-management', 'team-player', 'success', 'perfectionism', 'ambition', 'criticism'];
      
      if (validTests.includes(testName)) {
        // Normalize test name (e.g., 'iqtest' -> 'iq', 'creative-thinking' -> 'creative-thinking')
        const normalizedTestName = testName === 'iqtest' ? 'iq' : testName;
        loadTestTranslations(normalizedTestName, lng);
      }
    }
  }, [location.pathname, lng]);
}



