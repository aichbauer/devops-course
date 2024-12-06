import { fastify } from '../../src/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await fastify.ready();
  await prisma.message.deleteMany(); // Clear database for a fresh test
});

afterAll(async () => {
  await prisma.$disconnect();
  await fastify.close();
});

describe('User Routes', () => {
  test('GET /messages - should return an empty array', async () => {
    // Arrange
    const expectedMessages = [];
    const expectedStatus = 200;

    // Act
    const response = await fastify.inject({
      method: 'GET',
      url: '/messages',
    });
    const actualStatus = response.statusCode;
    const actualMessages = JSON.parse(response.body)?.data;

    // Assert
    expect(actualStatus).toBe(expectedStatus);
    expect(actualMessages).toEqual(expectedMessages);
  });

  test('POST /messages - should create a message', async () => {
    // Arrange
    const newMessage = { message: 'Hello World' };
    const expectedStatus = 200;
    const expectedMessage = newMessage.message;
    const expectedMessagesFromDB = [{ message: newMessage.message }];

    // Act
    const response = await fastify.inject({
      method: 'POST',
      url: '/messages',
      payload: newMessage,
    });
    const actualStatus = response.statusCode;
    const actualMessages = JSON.parse(response.body)?.data;
    const actualMessage = actualMessages[0].message;
    const messagesFromDB = await prisma.message.findMany();
    const actualMessagesFromDB = messagesFromDB.map((message) => ({
      message: message.message,
    }));

    // Assert
    expect(actualStatus).toBe(expectedStatus);
    expect(actualMessage).toEqual(expectedMessage);
    expect(actualMessagesFromDB).toEqual(expectedMessagesFromDB);
  });
});
