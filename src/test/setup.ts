import { MongoMemoryServer } from "mongodb-memory-server";
import { rabbitMqWrapper } from "../mq/rabbitmq-wrapper";
import mongoose from "mongoose";
import axios from "axios";

jest.mock("../mq/rabbitmq-wrapper");
jest.mock("axios");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "secret";
  process.env.DATABASE = "appname";
  process.env.ADMIN_PASSWORD = "12345";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  await mockClear();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

async function mockClear() {
  ((await rabbitMqWrapper.conn.createChannel()).assertQueue as jest.Mock).mockClear();
  ((await rabbitMqWrapper.conn.createChannel()).bindQueue as jest.Mock).mockClear();
  ((await rabbitMqWrapper.conn.createChannel()).assertExchange as jest.Mock).mockClear();
  ((await rabbitMqWrapper.conn.createChannel()).publish as jest.Mock).mockClear();
  ((await rabbitMqWrapper.conn.createChannel()).sendToQueue as jest.Mock).mockClear();
  ((await rabbitMqWrapper.conn.createChannel()).consume as jest.Mock).mockClear();
  ((await rabbitMqWrapper.conn.createChannel()).ack as jest.Mock).mockClear();
  (rabbitMqWrapper.conn.createChannel as jest.Mock).mockClear();

  (axios.get as jest.Mock).mockClear();
  (axios.post as jest.Mock).mockClear();
}