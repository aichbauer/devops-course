require('./instrumentation');
const os = require('os');
const process = require('process');
const Fastify = require('fastify');

const port = process.env.PORT || 5555;
const host = process.env.HOST || '0.0.0.0';
const { trace } = require('@opentelemetry/api');

const fastify = Fastify({
  logger: true
});

// Declare a route
fastify.get('/', function (_, reply) {
  const span = trace.getTracer('example').startSpan('request');
  const hostname = os.hostname();
  span.setAttribute('hostname', hostname);

  reply.status(500).send({ message: 'Hello World', hostname });
  span.end();
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

