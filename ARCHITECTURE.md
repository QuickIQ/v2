# Architecture Documentation

## System Overview

The QuickIQ platform is built as a full-stack application with a clear separation between frontend and backend.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **i18next** for internationalization
- **Stripe.js** for payment processing
- **Vite** as build tool
- **Axios** for API calls

### Backend
- **Node.js** with **Express**
- **PostgreSQL** database
- **Stripe** API for payments
- **TypeScript** for type safety
- **pg** (node-postgres) for database queries

## Database Schema

### Core Tables

#### `tests`
Stores test metadata:
- Basic info (name, slug, category)
- Monetization (is_premium, price_cents)
- Configuration (test_type: 'standard', 'iq', 'personality')
- Localization (default_language)

#### `questions`
Stores test questions:
- Linked to test via `test_id`
- `options` as JSONB array with `{key, points}` structure
- `scoring_rule` as JSONB for special logic (e.g., MBTI dimensions)

#### `results`
Defines score ranges and result tiers:
- `min_score` / `max_score` for score matching
- `tier`: 'excellent', 'good', 'under_development'
- `result_text_key` for translatable result text

#### `translations`
Centralized translation storage:
- `key` + `language_code` as unique identifier
- All UI text stored here (no hard-coded strings)

#### `test_sessions`
Tracks test completions:
- Stores answers as JSONB
- Links to payment intent if premium
- Tracks payment status

## Test Flow Architecture

```
1. Landing Page
   ↓
2. Social Proof Page
   ↓
3. Questions Page (20 questions, 5 options each)
   ↓
4. Email Capture Page
   ↓
5. Calculating Page (submits answers to backend)
   ↓
6. Payment Page (if premium) OR Results Page (if free)
   ↓
7. Results Page (3 variations based on tier)
```

## Scoring Logic

### Standard Tests
- Sum of points from selected options
- Map total score to result tier (excellent/good/under_development)

### IQ Tests
- Raw score calculated from answer points
- Converted to IQ scale (70-150):
  ```
  percentage = (rawScore / maxPossibleScore) * 100
  iqScore = 70 + (percentage / 100) * 75
  ```
- Extended interpretation based on IQ range

### Personality Tests (MBTI)
- Tracks 4 dimensions: E/I, S/N, T/F, J/P
- Each question option maps to a dimension via `scoring_rule`
- Final type = highest dimension in each pair (e.g., INTJ)

## API Endpoints

### Tests
- `GET /api/tests` - List all enabled tests
- `GET /api/tests/:slug` - Get test details
- `GET /api/tests/:slug/questions` - Get test questions (translated)
- `POST /api/tests/:slug/submit` - Submit answers and get results

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment intent
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/payments/status/:sessionId` - Check payment status

### Translations
- `GET /api/translations/:language` - Get all translations for language

## Localization Strategy

1. **Frontend i18n**: Uses i18next with JSON files
2. **Backend Translations**: Database-backed translations for dynamic content
3. **Translation Keys**: Consistent key naming (e.g., `test.landing.title`, `question.1.text`)

To add a new language:
1. Create JSON file in `frontend/src/i18n/locales/`
2. Add translations to database `translations` table
3. Register in i18next config

## Payment Flow

1. User completes test → session created (paid=false)
2. If premium test → create Stripe PaymentIntent
3. Frontend collects payment via Stripe Elements
4. Webhook confirms payment → update session (paid=true)
5. User sees results

## Scalability Considerations

- **Database**: Indexed queries for performance
- **Components**: Reusable test flow components
- **Scoring**: Pluggable scoring service per test type
- **Translations**: Centralized, queryable translation system
- **Tests**: Each test is self-contained with its own questions/results

## Adding a New Test Type

1. Add test to database with appropriate `test_type`
2. Implement scoring logic in `testScoring.ts` if needed
3. Create result display component (optional, falls back to standard)
4. Add translations for all text keys

## Security

- Environment variables for sensitive data
- Stripe webhook signature verification
- CORS configured for frontend origin
- SQL parameterized queries (prevents injection)
- Email validation on frontend and backend

