import { MongoMemoryServer } from "mongodb-memory-server";
import { kafkaWrapper } from "../kafka-wrapper";
import mongoose from "mongoose";
import axios from "axios";

jest.mock("../kafka-wrapper");
jest.mock("axios");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "secret";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  mockClear();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

function mockClear() {
  (kafkaWrapper.kafka.producer().disconnect as jest.Mock).mockClear();
  (kafkaWrapper.kafka.producer().connect as jest.Mock).mockClear();
  (kafkaWrapper.kafka.producer().send as jest.Mock).mockClear();
  (kafkaWrapper.kafka.producer as jest.Mock).mockClear();

  (kafkaWrapper.kafka.consumer({ groupId: '' }).run as jest.Mock).mockClear();
  (kafkaWrapper.kafka.consumer({ groupId: '' }).connect as jest.Mock).mockClear();
  (kafkaWrapper.kafka.consumer({ groupId: '' }).disconnect as jest.Mock).mockClear();
  (kafkaWrapper.kafka.consumer as jest.Mock).mockClear();

  (axios.get as jest.Mock).mockClear();
  (axios.post as jest.Mock).mockClear();
}