import os from 'os';
import process from 'process';
import Fastify from 'fastify';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get('/', function (_, reply) {
  const hostname = os.hostname();

  reply.send({ message: 'Hello World', hostname });
});

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

