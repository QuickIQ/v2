import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Common translations (shared across all tests)
import commonEn from './locales/en.json';
import commonTr from './locales/tr.json';

// Test-specific translations
import personalityEn from '../data/i18n/tests/personality/en.json';
import personalityTr from '../data/i18n/tests/personality/tr.json';

// Merge common translations with test-specific translations
const mergeTranslations = (common: any, test: any) => {
  // Deep merge: combine common translations with test-specific translations
  return {
    ...common,
    tests: {
      ...(common.tests || {}),
      ...(test.tests || {}),
    },
  };
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: mergeTranslations(commonEn, personalityEn),
      },
      tr: {
        translation: mergeTranslations(commonTr, personalityTr),
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Dynamic loader for future tests
export async function loadTestTranslations(testName: string, lng: string) {
  try {
    // Use dynamic import with relative path (Vite handles this correctly)
    const module = await import(`../data/i18n/tests/${testName}/${lng}.json`);
    // Merge the test translations into the existing resources
    // The module.default contains the JSON object
    const translations = module.default || module;
    if (translations && translations.tests) {
      // Deep merge: add test translations to existing resources
      i18n.addResourceBundle(lng, 'translation', translations, true, true);
    }
  } catch (error) {
    console.warn(`[i18n] Missing translation for ${testName}/${lng}:`, error);
  }
}

export default i18n;
