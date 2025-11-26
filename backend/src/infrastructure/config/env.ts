import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment Configuration
 * Validates and exports environment variables
 */
export const env = {
  // Server
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || '',

  // Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',

  // CORS - Support multiple origins (comma-separated)
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173,http://localhost:5174',
};

// Validate required environment variables
if (!env.DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL not set');
}

if (!env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  STRIPE_SECRET_KEY not set');
}

