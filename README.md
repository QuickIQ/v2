# QuickIQ Platform

A scalable multilingual psychological test platform built with React, TypeScript, Node.js, and PostgreSQL.

## Features

- 🧠 Multiple psychological tests with customizable scoring
- 🌍 Full i18n support (10+ languages)
- 💳 Stripe payment integration
- 📱 Fully responsive design
- 🔧 Admin-friendly database structure
- 🎯 Specialized IQ Test (70-145+ range)
- 👤 MBTI-compatible Personality Type Test

## Project Structure

```
.
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express API
└── database/          # Database schema and migrations
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
npm run install:all
```

### Environment Setup

Create `.env` files in both `frontend/` and `backend/` directories:

**backend/.env:**
```
DATABASE_URL=postgresql://user:password@localhost:5432/quickiq
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**frontend/.env:**
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Run Development Servers

```bash
npm run dev
```

This starts both frontend (http://localhost:3000) and backend (http://localhost:5000).

## Database Setup

```bash
cd backend
npm run db:migrate
npm run db:seed
```

## Detailed Setup

For comprehensive setup instructions, adding new tests, and deployment guidelines, see [SETUP.md](./SETUP.md).

## Key Features Implemented

✅ **Complete Test Flow**: Landing → Social Proof → Questions → Calculating → Email Capture → Payment → Results  
✅ **IQ Test**: Special scoring algorithm (70-145+ range) with detailed interpretation  
✅ **Personality Test**: MBTI-compatible 16-type calculation  
✅ **Payment Integration**: Stripe integration for premium tests ($1 for IQ and Personality)  
✅ **i18n Ready**: JSON-based translation system (English template included, easy to add 9 more languages)  
✅ **Responsive Design**: Mobile-first, modern UI similar to myiq.com  
✅ **Scalable Architecture**: Reusable components for 50+ tests  

## License

MIT

