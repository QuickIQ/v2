/**
 * Logger utility for conditional logging
 * In production, logs are disabled unless explicitly enabled via environment variable
 */

const isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
const isLoggingEnabled = isDevelopment || import.meta.env.VITE_ENABLE_LOGGING === 'true';

export const logger = {
  log: (...args: any[]) => {
    if (isLoggingEnabled) {
      console.log(...args);
    }
  },
  warn: (...args: any[]) => {
    if (isLoggingEnabled) {
      console.warn(...args);
    }
  },
  error: (...args: any[]) => {
    // Errors are always logged, even in production
    console.error(...args);
  },
  debug: (...args: any[]) => {
    if (isLoggingEnabled) {
      console.debug(...args);
    }
  },
};

