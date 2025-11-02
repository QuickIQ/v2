import { pool } from './connection';
import { randomBytes } from 'crypto';

/**
 * Comprehensive seed for Quick IQ Test
 * 25 questions: 12 matrix, 7 numerical, 6 verbal
 */

// Matrix question SVG templates (simplified representations)
const matrixSVGs = [
  // Matrix 1: Simple pattern continuation
  `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="50" height="50" fill="#667eea"/>
    <rect x="80" y="20" width="50" height="50" fill="#764ba2"/>
    <rect x="140" y="20" width="50" height="50" fill="#667eea"/>
    <rect x="20" y="80" width="50" height="50" fill="#764ba2"/>
    <rect x="80" y="80" width="50" height="50" fill="#667eea"/>
    <rect x="140" y="80" width="50" height="50" fill="#764ba2"/>
  </svg>`,
  // Additional matrices would be defined here...
];

async function seedIQTest() {
  try {
    console.log('🧠 Seeding Quick IQ Test...');

    // Get or create IQ Test
    let iqTestResult = await pool.query(
      `SELECT id FROM tests WHERE slug = 'quick-iq-test' LIMIT 1`
    );

    let iqTestId: number;
    
    if (iqTestResult.rows.length === 0) {
      const insertResult = await pool.query(
        `INSERT INTO tests (name, slug, category, enabled, default_language, is_premium, price_cents, test_type, order_index)
         VALUES ('Quick IQ Test', 'quick-iq-test', 'Intelligence', true, 'en', true, 100, 'iq', 1)
         RETURNING id`
      );
      iqTestId = insertResult.rows[0].id;
      console.log('✅ Created Quick IQ Test');
    } else {
      iqTestId = iqTestResult.rows[0].id;
      console.log('✅ Quick IQ Test exists');
    }

    // Clear existing questions for this test
    await pool.query(`DELETE FROM questions WHERE test_id = $1`, [iqTestId]);

    // Define 25 IQ questions
    const questions = [
      // 12 Matrix Questions (spatial category)
      ...generateMatrixQuestions(iqTestId, 12),
      // 7 Numerical Questions (logical category)
      ...generateNumericalQuestions(iqTestId, 7),
      // 6 Verbal Questions (verbal category)
      ...generateVerbalQuestions(iqTestId, 6),
    ];

    // Insert questions
    for (const q of questions) {
      await pool.query(
        `INSERT INTO questions (test_id, order_index, text_key, category, question_type, image_data, options, correct_answer_key, difficulty_weight)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          q.testId,
          q.orderIndex,
          q.textKey,
          q.category,
          q.questionType,
          q.imageData || null,
          JSON.stringify(q.options),
          q.correctAnswerKey,
          q.difficultyWeight,
        ]
      );
    }

    console.log(`✅ Inserted ${questions.length} IQ questions`);

    // Update results for IQ score ranges
    await pool.query(`DELETE FROM results WHERE test_id = $1`, [iqTestId]);

    await pool.query(
      `INSERT INTO results (test_id, min_score, max_score, result_text_key, tier)
       VALUES
         ($1, 130, 145, 'iq.quick.result.exceptional', 'exceptional'),
         ($1, 110, 129, 'iq.quick.result.above_average', 'good'),
         ($1, 70, 109, 'iq.quick.result.developing', 'under_development')`,
      [iqTestId]
    );

    console.log('✅ Inserted IQ test results');

    // Insert translations
    await insertTranslations(iqTestId);

    console.log('✅ Quick IQ Test seeded successfully!');
  } catch (error) {
    console.error('❌ IQ Test seeding failed:', error);
    throw error;
  }
}

function generateMatrixQuestions(testId: number, count: number) {
  const questions = [];
  const patterns = [
    { pattern: 'horizontal_alternate', correct: 'A' },
    { pattern: 'vertical_alternate', correct: 'B' },
    { pattern: 'diagonal', correct: 'C' },
    { pattern: 'rotation', correct: 'D' },
    { pattern: 'color_progression', correct: 'A' },
    { pattern: 'shape_progression', correct: 'B' },
    { pattern: 'size_progression', correct: 'C' },
    { pattern: 'combination', correct: 'D' },
    { pattern: 'mirror', correct: 'A' },
    { pattern: 'sum', correct: 'B' },
    { pattern: 'difference', correct: 'C' },
    { pattern: 'multiplication', correct: 'D' },
  ];

  for (let i = 0; i < count; i++) {
    const orderIndex = i + 1;
    const pattern = patterns[i % patterns.length];
    const options = [
      { key: 'A', points: pattern.correct === 'A' ? 5 : 0, isCorrect: pattern.correct === 'A' },
      { key: 'B', points: pattern.correct === 'B' ? 5 : 0, isCorrect: pattern.correct === 'B' },
      { key: 'C', points: pattern.correct === 'C' ? 5 : 0, isCorrect: pattern.correct === 'C' },
      { key: 'D', points: pattern.correct === 'D' ? 5 : 0, isCorrect: pattern.correct === 'D' },
      { key: 'E', points: 0, isCorrect: false },
    ];

    questions.push({
      testId,
      orderIndex,
      textKey: `iq.quick.question.matrix.${orderIndex.toString().padStart(2, '0')}`,
      category: 'spatial',
      questionType: 'matrix',
      imageData: matrixSVGs[i % matrixSVGs.length] || matrixSVGs[0],
      options,
      correctAnswerKey: pattern.correct,
      difficultyWeight: 1.0 + (i * 0.05), // Increasing difficulty
    });
  }

  return questions;
}

function generateNumericalQuestions(testId: number, count: number) {
  const questions = [];
  const patterns = [
    { sequence: [2, 4, 8, 16], next: 32, correct: 'A' },
    { sequence: [1, 4, 9, 16], next: 25, correct: 'B' },
    { sequence: [5, 10, 15, 20], next: 25, correct: 'C' },
    { sequence: [3, 6, 12, 24], next: 48, correct: 'D' },
    { sequence: [1, 3, 6, 10], next: 15, correct: 'A' },
    { sequence: [7, 14, 21, 28], next: 35, correct: 'B' },
    { sequence: [2, 6, 18, 54], next: 162, correct: 'C' },
  ];

  for (let i = 0; i < count; i++) {
    const orderIndex = 13 + i; // Starts after matrix questions
    const pattern = patterns[i % patterns.length];
    
    // Generate wrong options
    const wrongOptions = [
      pattern.next + 10,
      pattern.next - 5,
      pattern.next * 2,
      pattern.next / 2,
    ].map(n => Math.round(n));

    const options = [
      { key: 'A', value: pattern.next, points: pattern.correct === 'A' ? 5 : 0, isCorrect: pattern.correct === 'A' },
      { key: 'B', value: wrongOptions[0], points: pattern.correct === 'B' ? 5 : 0, isCorrect: pattern.correct === 'B' },
      { key: 'C', value: wrongOptions[1], points: pattern.correct === 'C' ? 5 : 0, isCorrect: pattern.correct === 'C' },
      { key: 'D', value: wrongOptions[2], points: pattern.correct === 'D' ? 5 : 0, isCorrect: pattern.correct === 'D' },
      { key: 'E', value: wrongOptions[3], points: 0, isCorrect: false },
    ];

    questions.push({
      testId,
      orderIndex,
      textKey: `iq.quick.question.numerical.${orderIndex.toString().padStart(2, '0')}`,
      category: 'logical',
      questionType: 'numerical',
      imageData: null,
      options,
      correctAnswerKey: pattern.correct,
      difficultyWeight: 1.0 + (i * 0.05),
    });
  }

  return questions;
}

function generateVerbalQuestions(testId: number, count: number) {
  const questions = [];
  const patterns = [
    { type: 'analogy', correct: 'A' },
    { type: 'synonym', correct: 'B' },
    { type: 'antonym', correct: 'C' },
    { type: 'completion', correct: 'D' },
    { type: 'classification', correct: 'A' },
    { type: 'logic', correct: 'B' },
  ];

  for (let i = 0; i < count; i++) {
    const orderIndex = 20 + i; // Starts after matrix + numerical
    const pattern = patterns[i % patterns.length];
    
    const options = [
      { key: 'A', points: pattern.correct === 'A' ? 5 : 0, isCorrect: pattern.correct === 'A' },
      { key: 'B', points: pattern.correct === 'B' ? 5 : 0, isCorrect: pattern.correct === 'B' },
      { key: 'C', points: pattern.correct === 'C' ? 5 : 0, isCorrect: pattern.correct === 'C' },
      { key: 'D', points: pattern.correct === 'D' ? 5 : 0, isCorrect: pattern.correct === 'D' },
      { key: 'E', points: 0, isCorrect: false },
    ];

    questions.push({
      testId,
      orderIndex,
      textKey: `iq.quick.question.verbal.${orderIndex.toString().padStart(2, '0')}`,
      category: 'verbal',
      questionType: 'verbal',
      imageData: null,
      options,
      correctAnswerKey: pattern.correct,
      difficultyWeight: 1.0 + (i * 0.05),
    });
  }

  return questions;
}

async function insertTranslations(testId: number) {
  const translations = [
    // Test name
    { key: 'iq.quick.title', lang: 'en', value: 'Quick IQ Test' },
    { key: 'iq.quick.description', lang: 'en', value: 'Discover your intelligence level in just 20 minutes' },
    
    // Landing page
    { key: 'iq.quick.landing.headline', lang: 'en', value: 'Discover Your IQ in 20 Minutes' },
    { key: 'iq.quick.landing.subheadline', lang: 'en', value: 'Scientifically validated IQ assessment with detailed results' },
    { key: 'iq.quick.landing.cta', lang: 'en', value: 'Start IQ Test' },
    
    // Matrix questions (12)
    ...Array.from({ length: 12 }, (_, i) => ({
      key: `iq.quick.question.matrix.${(i + 1).toString().padStart(2, '0')}`,
      lang: 'en',
      value: `Which option completes the pattern?`,
    })),
    
    // Numerical questions (7)
    ...Array.from({ length: 7 }, (_, i) => ({
      key: `iq.quick.question.numerical.${(i + 13).toString().padStart(2, '0')}`,
      lang: 'en',
      value: `What number comes next in this sequence?`,
    })),
    
    // Verbal questions (6)
    ...Array.from({ length: 6 }, (_, i) => ({
      key: `iq.quick.question.verbal.${(i + 20).toString().padStart(2, '0')}`,
      lang: 'en',
      value: `Complete the analogy: Book is to Library as Car is to...?`,
    })),
    
    // Results
    { key: 'iq.quick.result.exceptional.title', lang: 'en', value: 'Exceptional Intelligence' },
    { key: 'iq.quick.result.exceptional.description', lang: 'en', value: 'Your IQ score indicates exceptional cognitive ability (130-145+). You demonstrate superior reasoning, problem-solving, and analytical skills.' },
    
    { key: 'iq.quick.result.above_average.title', lang: 'en', value: 'Above Average Intelligence' },
    { key: 'iq.quick.result.above_average.description', lang: 'en', value: 'Your IQ score shows above average intelligence (110-129). You have strong cognitive abilities and analytical thinking skills.' },
    
    { key: 'iq.quick.result.developing.title', lang: 'en', value: 'Developing Intelligence' },
    { key: 'iq.quick.result.developing.description', lang: 'en', value: 'Your IQ score indicates developing intelligence (70-109). There is significant room for cognitive growth and skill development.' },
    
    // UI Elements
    { key: 'iq.quick.timer.label', lang: 'en', value: 'Time Remaining' },
    { key: 'iq.quick.question.progress', lang: 'en', value: 'Question {current} of {total}' },
    { key: 'iq.quick.understand.button', lang: 'en', value: 'I Understand' },
    { key: 'iq.quick.next.button', lang: 'en', value: 'Next Question' },
    { key: 'iq.quick.submit.button', lang: 'en', value: 'Submit Answers' },
    { key: 'iq.quick.calculating', lang: 'en', value: 'Calculating your results...' },
  ];

  for (const trans of translations) {
    await pool.query(
      `INSERT INTO translations (key, language_code, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (key, language_code) DO UPDATE SET value = $3`,
      [trans.key, trans.lang, trans.value]
    );
  }
}

export { seedIQTest };

