import testConfigData from '../data/tests/test-config.json';

// Type assertion for JSON import
const testConfig = testConfigData as { tests: Array<{
  id: string;
  slug: string;
  name: { en: string; tr: string };
  subtitle?: { en: string; tr: string };
  category: string;
  icon: string;
  iconEmoji: string;
  questions: number;
  minutes: number;
  colors: {
    primary: string;
    light: string;
    cardBackground: string;
    cardBorder: string;
    cardHoverBorder: string;
    cardGlow: string;
    cardShadow: string;
    buttonGradient: string;
    titleGradient: string;
  };
  scoring?: {
    thresholds: {
      excellent: number;
      good: number;
      developing: number;
    };
    timeLimit: number;
  };
}> };

export interface TestContent {
  testId: string;
  colors: {
    primary: {
      main: string;
      light: string;
      dark?: string;
    };
    background: {
      landing: {
        gradient: string;
        animated?: string[];
      };
      questions: {
        gradient: string;
      };
      analyzing: {
        gradient: string;
        animated?: string[];
      };
    };
    card: {
      background: string;
      border: string;
      borderHover: string;
    };
    button: {
      primary: {
        gradient: string;
        shadow: string;
      };
    };
    progressBar: {
      background: string;
      fill: string;
    };
    answerButtons?: {
      gradients: string[];
      glowColors: string[];
      labels: string[];
    };
  };
  landing: {
    title: {
      en: string;
      tr: string;
    };
    subtitle: {
      en: string;
      tr: string;
    };
    description: {
      en: string;
      tr: string;
    };
    reminder: {
      en: string;
      tr: string;
    };
    startButton: {
      en: string;
      tr: string;
    };
  };
  questions: {
    total: number;
    timeLimit: number;
    options: string[];
  };
  analyzing: {
    title: {
      en: string;
      tr: string;
    };
    subtitle: {
      en: string;
      tr: string;
    };
    duration: number;
  };
  email?: {
    title: {
      en: string;
      tr: string;
    };
    subtitle: {
      en: string;
      tr: string;
    };
  };
  payment?: {
    intro: {
      en: string;
      tr: string;
    };
    unlockButton: {
      en: string;
      tr: string;
    };
  };
}

/**
 * Load test content by test ID
 */
export async function loadTestContent(testId: string): Promise<TestContent | null> {
  try {
    console.log(`🔍 Attempting to load JSON for testId: ${testId}`);
    const content = await import(`../data/tests/contents/${testId}.json`);
    
    if (!content || !content.default) {
      console.error(`❌ Content loaded but default export is missing for: ${testId}`);
      return null;
    }
    
    const testContent = content.default as TestContent;
    
    // Validate that essential fields exist
    if (!testContent.testId) {
      console.warn(`⚠️ Test content missing testId field: ${testId}`);
    }
    if (!testContent.colors || !testContent.landing || !testContent.questions || !testContent.analyzing) {
      console.error(`❌ Test content missing essential fields for: ${testId}`);
      return null;
    }
    
    console.log(`✅ Successfully loaded and validated content for: ${testId}`);
    return testContent;
  } catch (error: any) {
    console.error(`❌ Failed to load test content for ${testId}:`, error);
    console.error(`   Error details:`, {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return null;
  }
}

/**
 * Get test config by ID or slug
 */
export function getTestConfig(idOrSlug: string) {
  return testConfig.tests.find(
    (test) => test.id === idOrSlug || test.slug === idOrSlug
  );
}

/**
 * Get all test configs
 */
export function getAllTestConfigs() {
  return testConfig.tests;
}

/**
 * Get test configs by category
 */
export function getTestConfigsByCategory(category: string) {
  return testConfig.tests.filter((test) => test.category === category);
}

