import { fastify } from '../../src/app';
import prisma from '../../src/client';

jest.mock('../../src/client', () => ({
  __esModule: true,
  default: {
    message: {
      // only stub if you work with the result in the unit you check
      findMany: jest.fn(),
      create: jest.fn(),
    },
  },
}));

beforeAll(async () => {
  await fastify.ready();
});

afterAll(async () => {
  await fastify.close();
});

describe('User Routes', () => {
  test('GET /messages - should return an empty array', async () => {
    // Arrange
    const expectedFindManyToBeCalledTimes = 1;
    const expectedStatus = 200;

    // Act
    const response = await fastify.inject({
      method: 'GET',
      url: '/messages',
    });
    const actualStatus = response.statusCode;
    const actualFindManyToBeCalledTimes = prisma.message.findMany.mock.calls.length;

    // Assert
    expect(actualStatus).toBe(expectedStatus);
    expect(actualFindManyToBeCalledTimes).toBe(expectedFindManyToBeCalledTimes);
  });

  test('POST /messages - should create a message', async () => {
    // Arrange
    const newMessage = { message: 'Hello World' };
    const expectedStatus = 200;
    const expectedCreateToBeCalledTimes = 1;

    // Act
    const response = await fastify.inject({
      method: 'POST',
      url: '/messages',
      payload: newMessage,
    });
    const actualStatus = response.statusCode;
    const actualCreateToBeCalledTimes = prisma.message.create.mock.calls.length;

    // Assert
    expect(actualStatus).toBe(expectedStatus);
    expect(actualCreateToBeCalledTimes).toBe(expectedCreateToBeCalledTimes);
  });
});
