import { Request, Response, NextFunction } from 'express';
import { logger } from '../../infrastructure/logging/Logger';

/**
 * Error Handler Middleware
 * Maps domain/application errors to HTTP status codes
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.error('Error:', err.message, err.stack);

  // Default to 500
  let statusCode = 500;
  let message = 'Internal server error';

  // Map error messages to status codes
  if (err.message.includes('not found')) {
    statusCode = 404;
    message = err.message;
  } else if (err.message.includes('required') || err.message.includes('invalid')) {
    statusCode = 400;
    message = err.message;
  } else if (err.message.includes('permission') || err.message.includes('Payment required')) {
    statusCode = 403;
    message = err.message;
  } else {
    message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message;
  }

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

