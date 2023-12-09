import { app } from "./app";
import sockets from "./sockets";
import mongoose from "mongoose";
import admin from "firebase-admin";
import {
  PORT,
  DATABASE,
  MONGO_URI,
  FIREBASE_SA
} from "./env";

const server = sockets(app);

const start = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(FIREBASE_SA)),
    });
    // kafkaWrapper.init(KAFKA_ID, [KAFKA_1]);
    await mongoose.connect(`${MONGO_URI}/${DATABASE}`);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  const HOST = "0.0.0.0";
  server.listen(PORT, HOST, () => {
    console.log(`Server is on http://${HOST}:${PORT}`);
  });
};

start();
