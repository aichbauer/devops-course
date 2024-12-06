import os from 'os';
import Fastify from 'fastify';
import cors from '@fastify/cors'
import prisma from './client';

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


