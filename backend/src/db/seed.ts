import { pool } from './connection';
import { seedIQTest } from './seed-iq-test';

async function seed() {
  try {
    console.log('🌱 Seeding database...');

    // Insert tests
    const testResults = await pool.query(`
      INSERT INTO tests (name, slug, category, enabled, default_language, is_premium, price_cents, test_type, order_index)
      VALUES
        ('IQ Test', 'iq-test', 'Intelligence', true, 'en', true, 100, 'iq', 1),
        ('Personality Type Test', 'personality-test', 'Personality', true, 'en', true, 100, 'personality', 2),
        ('Stress Level Test', 'stress-test', 'Wellness', true, 'en', false, 0, 'standard', 3),
        ('Emotional Intelligence Test', 'eq-test', 'Intelligence', true, 'en', false, 0, 'standard', 4)
      ON CONFLICT (slug) DO NOTHING
      RETURNING id, name, slug;
    `);

    console.log('✅ Tests inserted');

    // Get test IDs
    const iqTestId = testResults.rows.find((r: any) => r.slug === 'iq-test')?.id;
    const personalityTestId = testResults.rows.find((r: any) => r.slug === 'personality-test')?.id;
    const stressTestId = testResults.rows.find((r: any) => r.slug === 'stress-test')?.id;

    if (iqTestId) {
      // Insert IQ test questions (sample - 20 questions)
      const iqQuestions = Array.from({ length: 20 }, (_, i) => {
        const options = [
          { key: `iq_q${i + 1}_opt1`, points: 1 },
          { key: `iq_q${i + 1}_opt2`, points: 2 },
          { key: `iq_q${i + 1}_opt3`, points: 3 },
          { key: `iq_q${i + 1}_opt4`, points: 4 },
          { key: `iq_q${i + 1}_opt5`, points: 5 },
        ];
        return { testId: iqTestId, order: i + 1, textKey: `iq.question.${i + 1}`, options };
      });

      for (const q of iqQuestions) {
        await pool.query(
          `INSERT INTO questions (test_id, order_index, text_key, options)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (test_id, order_index) DO NOTHING`,
          [q.testId, q.order, q.textKey, JSON.stringify(q.options)]
        );
      }

      // Insert IQ test results
      await pool.query(`
        INSERT INTO results (test_id, min_score, max_score, result_text_key, tier)
        VALUES
          ($1, 130, 200, 'iq.result.excellent', 'excellent'),
          ($1, 115, 129, 'iq.result.good', 'good'),
          ($1, 85, 114, 'iq.result.average', 'under_development')
        ON CONFLICT DO NOTHING
      `, [iqTestId]);
    }

    if (personalityTestId) {
      // Insert Personality test questions with MBTI scoring rules
      const personalityQuestions = Array.from({ length: 20 }, (_, i) => {
        const questionNum = i + 1;
        const options = [
          { key: `per_q${questionNum}_E`, points: 1 }, // Extraversion
          { key: `per_q${questionNum}_I`, points: 1 }, // Introversion
          { key: `per_q${questionNum}_S`, points: 1 }, // Sensing
          { key: `per_q${questionNum}_N`, points: 1 }, // Intuition
          { key: `per_q${questionNum}_T`, points: 1 }, // Thinking
        ];
        const scoringRule: Record<string, string> = {
          [`per_q${questionNum}_E`]: 'E',
          [`per_q${questionNum}_I`]: 'I',
          [`per_q${questionNum}_S`]: 'S',
          [`per_q${questionNum}_N`]: 'N',
          [`per_q${questionNum}_T`]: 'T',
        };
        return {
          testId: personalityTestId,
          order: questionNum,
          textKey: `personality.question.${questionNum}`,
          options,
          scoringRule,
        };
      });

      for (const q of personalityQuestions) {
        await pool.query(
          `INSERT INTO questions (test_id, order_index, text_key, options, scoring_rule)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (test_id, order_index) DO NOTHING`,
          [q.testId, q.order, q.textKey, JSON.stringify(q.options), JSON.stringify(q.scoringRule)]
        );
      }
    }

    if (stressTestId) {
      // Insert sample stress test questions
      const stressQuestions = Array.from({ length: 20 }, (_, i) => {
        const options = [
          { key: `stress_q${i + 1}_opt1`, points: 1 },
          { key: `stress_q${i + 1}_opt2`, points: 2 },
          { key: `stress_q${i + 1}_opt3`, points: 3 },
          { key: `stress_q${i + 1}_opt4`, points: 4 },
          { key: `stress_q${i + 1}_opt5`, points: 5 },
        ];
        return { testId: stressTestId, order: i + 1, textKey: `stress.question.${i + 1}`, options };
      });

      for (const q of stressQuestions) {
        await pool.query(
          `INSERT INTO questions (test_id, order_index, text_key, options)
           VALUES ($1, $2, $3, $4)
           ON CONFLICT (test_id, order_index) DO NOTHING`,
          [q.testId, q.order, q.textKey, JSON.stringify(q.options)]
        );
      }

      // Insert stress test results
      await pool.query(`
        INSERT INTO results (test_id, min_score, max_score, result_text_key, tier)
        VALUES
          ($1, 80, 100, 'stress.result.excellent', 'excellent'),
          ($1, 60, 79, 'stress.result.good', 'good'),
          ($1, 0, 59, 'stress.result.under_development', 'under_development')
        ON CONFLICT DO NOTHING
      `, [stressTestId]);
    }

    // Insert English translations
    const translations = [
      // Test names
      { key: 'IQ Test', language: 'en', value: 'IQ Test' },
      { key: 'Personality Type Test', language: 'en', value: 'Personality Type Test' },
      { key: 'Stress Level Test', language: 'en', value: 'Stress Level Test' },
      { key: 'Emotional Intelligence Test', language: 'en', value: 'Emotional Intelligence Test' },

      // Sample IQ questions
      ...Array.from({ length: 20 }, (_, i) => ({
        key: `iq.question.${i + 1}`,
        language: 'en',
        value: `IQ Question ${i + 1}: What is the next number in this sequence?`,
      })),

      // Sample personality questions
      ...Array.from({ length: 20 }, (_, i) => ({
        key: `personality.question.${i + 1}`,
        language: 'en',
        value: `Personality Question ${i + 1}: How do you prefer to recharge your energy?`,
      })),

      // Sample stress questions
      ...Array.from({ length: 20 }, (_, i) => ({
        key: `stress.question.${i + 1}`,
        language: 'en',
        value: `Stress Question ${i + 1}: How often do you feel overwhelmed?`,
      })),

      // Option translations (sample)
      { key: 'iq_q1_opt1', language: 'en', value: 'Option A' },
      { key: 'iq_q1_opt2', language: 'en', value: 'Option B' },
      { key: 'iq_q1_opt3', language: 'en', value: 'Option C' },
      { key: 'iq_q1_opt4', language: 'en', value: 'Option D' },
      { key: 'iq_q1_opt5', language: 'en', value: 'Option E' },

      // Result translations
      { key: 'iq.result.excellent', language: 'en', value: 'Excellent IQ Score' },
      { key: 'iq.result.good', language: 'en', value: 'Good IQ Score' },
      { key: 'iq.result.average', language: 'en', value: 'Average IQ Score' },
      { key: 'stress.result.excellent', language: 'en', value: 'Low Stress Level' },
      { key: 'stress.result.good', language: 'en', value: 'Moderate Stress Level' },
      { key: 'stress.result.under_development', language: 'en', value: 'High Stress Level' },
    ];

    for (const trans of translations) {
      await pool.query(
        `INSERT INTO translations (key, language_code, value)
         VALUES ($1, $2, $3)
         ON CONFLICT (key, language_code) DO UPDATE SET value = $3`,
        [trans.key, trans.language, trans.value]
      );
    }

    console.log('✅ Translations inserted');

    // Seed Quick IQ Test
    await seedIQTest();

    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();

