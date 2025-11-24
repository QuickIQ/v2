/**
 * Entry point for the backend server
 * Uses Clean Architecture structure
 */
import { createApp } from './server';
import { env } from './infrastructure/config/env';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`);
});

