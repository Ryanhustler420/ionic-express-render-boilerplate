export const kafkaWrapper = {
  kafka: {
    producer: jest.fn().mockReturnValue({
      connect: jest.fn(),
      subscribe: jest.fn(),
      disconnect: jest.fn(),
      send: jest.fn().mockImplementation((topic, messages) => {}),
      sendBatch: jest.fn(),
      transaction: jest.fn(),
    }),
    consumer: jest.fn().mockReturnValue({
      connect: jest.fn(),
      subscribe: jest.fn(),
      disconnect: jest.fn(),
      run: jest.fn().mockReturnValue({
        eachMessage: jest
          .fn()
          .mockImplementation((topic, partition, message) => {}),
      }),
    }),
    admin: jest.fn().mockImplementation((config) => {}),
    logger: jest.fn().mockImplementation(() => {}),
  },
};
