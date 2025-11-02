# QuickIQ Platform - Setup Guide

## Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 14+
- **Stripe Account** (for payment processing)

## Installation Steps

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Database Setup

Create a PostgreSQL database:

```bash
createdb quickiq
```

Or using psql:
```sql
CREATE DATABASE quickiq;
```

### 3. Environment Configuration

**Backend** (`backend/.env`):
```env
DATABASE_URL=postgresql://user:password@localhost:5432/quickiq
JWT_SECRET=your-secret-key-change-in-production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

### 4. Database Migration and Seeding

```bash
cd backend
npm run db:migrate
npm run db:seed
```

This will create:
- Database tables (tests, questions, results, translations, test_sessions)
- Sample tests (IQ Test, Personality Test, Stress Test, EQ Test)
- Sample questions and results
- English translations

### 5. Run Development Servers

From the root directory:

```bash
npm run dev
```

Or run separately:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your test API keys from the Stripe Dashboard
3. Add them to `backend/.env` (secret key) and `frontend/.env` (publishable key)
4. For webhooks, set up a webhook endpoint pointing to:
   `http://your-domain.com/api/payments/webhook`

## Adding New Tests

1. Insert test into `tests` table:
```sql
INSERT INTO tests (name, slug, category, enabled, default_language, is_premium, price_cents, test_type, order_index)
VALUES ('Your Test', 'your-test-slug', 'Category', true, 'en', false, 0, 'standard', 5);
```

2. Add questions (20 questions recommended):
```sql
INSERT INTO questions (test_id, order_index, text_key, options)
VALUES (1, 1, 'question.key.1', '[
  {"key": "opt1", "points": 1},
  {"key": "opt2", "points": 2},
  {"key": "opt3", "points": 3},
  {"key": "opt4", "points": 4},
  {"key": "opt5", "points": 5}
]'::jsonb);
```

3. Add result tiers:
```sql
INSERT INTO results (test_id, min_score, max_score, result_text_key, tier)
VALUES 
  (1, 80, 100, 'result.excellent', 'excellent'),
  (1, 60, 79, 'result.good', 'good'),
  (1, 0, 59, 'result.under_development', 'under_development');
```

4. Add translations for all text keys in `translations` table.

## Adding New Languages

1. Create a new JSON file in `frontend/src/i18n/locales/` (e.g., `es.json`)
2. Copy structure from `en.json` and translate all values
3. Import and add to `frontend/src/i18n/config.ts`
4. Add translations to database `translations` table with the new language_code

## Production Deployment

1. Build frontend: `cd frontend && npm run build`
2. Build backend: `cd backend && npm run build`
3. Set production environment variables
4. Run migrations: `cd backend && npm run db:migrate`
5. Start production server: `cd backend && npm start`

## Project Structure

```
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── i18n/          # Internationalization
│   │   └── types/         # TypeScript types
│   └── package.json
├── backend/               # Node.js + Express backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── db/            # Database schema & migrations
│   │   └── middleware/    # Express middleware
│   └── package.json
└── package.json           # Root package.json with workspace scripts
```

## Troubleshooting

**Database connection errors:**
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database exists

**Stripe payment errors:**
- Verify API keys are correct
- Check webhook endpoint is configured
- Use test mode keys for development

**Translation not showing:**
- Check language code matches in database and frontend
- Verify translation keys exist in database
- Check browser language detection

