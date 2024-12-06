import os from 'os';
import process from 'process';
import Fastify from 'fastify';
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

export const fastify = Fastify({
  logger: true
});
fastify.register(cors, {
  origin: '*'
});

// Declare a route
fastify.get('/', function (req, reply) {
  const hostname = os.hostname();

  reply.send({ message: 'Hello World', hostname });
});

fastify.delete('/messages', async function (_, reply) {
  try {
    await prisma.message.deleteMany({});
    reply.send({ data: [] });
  } catch
  (err) {
    reply.send({ error: err });
  }
});

fastify.get('/messages', async function (_, reply) {
  try {
    const messages = await prisma.message.findMany({});

    reply.send({ data: messages });
  } catch (err) {
    reply.send({ error: err });
  }
});

fastify.post('/messages', async function (req, reply) {
  try {
    const message = await prisma.message.create({
      data: {
        message: req.body.message,
      },
    });
    reply.send({ data: [message] });
  } catch (err) {
    fastify.log.error(err);
    reply.send({ error: err });
  }
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

