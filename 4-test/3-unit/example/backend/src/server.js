import process from 'process';
import { fastify } from './app';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

// Run the server!
fastify.listen({ port, host }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

process.on('SIGINT', () => {
  fastify.log.info("Interrupted");
  process.exit(0);
});

process.on('SIGTERM', () => {
  fastify.log.info("Terminated");
  process.exit(0);
});