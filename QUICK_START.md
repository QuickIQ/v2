# Quick Start Guide

## Step-by-Step Setup

### 1. Install Dependencies ✅
If you haven't already, run:
```bash
npm install
cd backend
npm install
cd ../frontend
npm install
```

Or use the shortcut:
```bash
npm run install:all
```

### 2. Environment Variables ✅
I've created `.env` files for you. **You need to update them**:

**backend/.env** - Update these values:
- `DATABASE_URL` - Your PostgreSQL connection string
- `STRIPE_SECRET_KEY` - Your Stripe secret key (or use placeholder for now)
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret (or use placeholder)

**frontend/.env** - Update:
- `VITE_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key (or use placeholder)

### 3. Set Up PostgreSQL Database

**Option A: If you have PostgreSQL installed:**
```bash
# Create database
createdb quickiq

# Or using psql:
psql -U postgres
CREATE DATABASE quickiq;
```

**Option B: If you DON'T have PostgreSQL:**
- Download and install from: https://www.postgresql.org/download/windows/
- Or use a cloud service like Supabase (free tier available)
- Update `DATABASE_URL` in `backend/.env` with your connection string

### 4. Run Database Migrations

Once your database is set up:
```bash
cd backend
npm run db:migrate
npm run db:seed
```

This creates all tables and adds sample data (IQ Test, Personality Test, etc.)

### 5. Start Development Servers

From the root directory:
```bash
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Troubleshooting

### "Cannot find module" errors
- Make sure you ran `npm install` in root, frontend, AND backend folders

### Database connection errors
- Check PostgreSQL is running: `psql -U postgres -l`
- Verify `DATABASE_URL` in `backend/.env` is correct
- Make sure the database exists

### Port already in use
- Change `PORT` in `backend/.env` to a different port (e.g., 5001)
- Or close the application using port 5000/3000

### Stripe errors (if testing payments)
- You can skip Stripe setup initially - just use placeholder values
- The app will work for free tests without Stripe

## What Works Without Setup

Even without a database, you can:
- ✅ Start the frontend (will show errors but UI loads)
- ✅ See the app structure
- ✅ Test the frontend components

To fully test, you need:
- ✅ PostgreSQL database
- ✅ Database migrations run
- ✅ Stripe keys (for payment tests)

## Next Steps After Setup

1. Open http://localhost:3000
2. You should see the home page with test listings
3. Click on a test to start the flow
4. Free tests (Stress, EQ) work immediately
5. Premium tests (IQ, Personality) require Stripe setup
