import os from 'os';
import process from 'process';
import Fastify from 'fastify';
import crypto from 'crypto';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get('/', function (req, reply) {
  const hostname = os.hostname();

  const cipher = crypto.createCipheriv("DES", 'key', 'iv'); // Noncompliant
  const encryptedText = cipher.update("test", "utf8", "hex");

  reply.send({ message: 'Hello World', hostname, encryptedText });
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

