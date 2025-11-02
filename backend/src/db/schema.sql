-- Tests Table
CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100),
  enabled BOOLEAN DEFAULT true,
  default_language VARCHAR(10) DEFAULT 'en',
  is_premium BOOLEAN DEFAULT false,
  price_cents INTEGER DEFAULT 0,
  test_type VARCHAR(50) DEFAULT 'standard', -- 'standard', 'iq', 'personality'
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  text_key VARCHAR(255) NOT NULL,
  category VARCHAR(50), -- 'logical', 'verbal', 'spatial' for IQ tests
  question_type VARCHAR(50), -- 'matrix', 'numerical', 'verbal' for IQ tests
  image_data TEXT, -- SVG or image reference for matrix questions
  options JSONB NOT NULL, -- Array of {key: string, points: number, isCorrect: boolean}
  correct_answer_key VARCHAR(255), -- The correct option key
  difficulty_weight DECIMAL(3,2) DEFAULT 1.0, -- Weight for scoring calculation
  scoring_rule JSONB, -- Additional scoring configuration
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(test_id, order_index)
);

-- Results Table
CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  min_score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  result_text_key VARCHAR(255) NOT NULL,
  image_ref VARCHAR(255),
  tier VARCHAR(50) DEFAULT 'standard', -- 'excellent', 'good', 'under_development'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Translations Table
CREATE TABLE IF NOT EXISTS translations (
  id SERIAL PRIMARY KEY,
  key VARCHAR(500) NOT NULL,
  language_code VARCHAR(10) NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(key, language_code)
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Sessions Table (for tracking test completions)
CREATE TABLE IF NOT EXISTS test_sessions (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  email VARCHAR(255),
  session_token VARCHAR(255) UNIQUE, -- For tracking without login
  answers JSONB NOT NULL, -- Array of {question_id, option_key, points, category}
  total_score INTEGER,
  category_scores JSONB, -- {logical: X, verbal: Y, spatial: Z}
  result_id INTEGER REFERENCES results(id),
  time_remaining INTEGER, -- seconds remaining when session saved
  time_started TIMESTAMP,
  time_completed TIMESTAMP,
  payment_intent_id VARCHAR(255),
  paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Results Table (final results after payment)
CREATE TABLE IF NOT EXISTS user_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  test_session_id INTEGER REFERENCES test_sessions(id) ON DELETE SET NULL,
  total_score INTEGER NOT NULL,
  category_scores JSONB, -- {logical: X, verbal: Y, spatial: Z}
  result_tier VARCHAR(50), -- 'exceptional', 'above_average', 'developing'
  detail JSONB, -- Full result details
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_questions_test_id ON questions(test_id);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
CREATE INDEX IF NOT EXISTS idx_results_test_id ON results(test_id);
CREATE INDEX IF NOT EXISTS idx_translations_key_lang ON translations(key, language_code);
CREATE INDEX IF NOT EXISTS idx_test_sessions_test_id ON test_sessions(test_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_email ON test_sessions(email);
CREATE INDEX IF NOT EXISTS idx_test_sessions_user_id ON test_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_test_sessions_session_token ON test_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_results_user_id ON user_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_results_test_id ON user_results(test_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

