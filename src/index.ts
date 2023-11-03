import http from "http";
import { app } from "./app";
import mongoose from "mongoose";
import socketIO from "socket.io";
import admin from "firebase-admin";
import { DATABASE, MONGO_URI, PORT } from "./env";
import serviceAccount from "./secrets/firebase-config";

const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: { origin: "*" },
  path: "/deep/socket",
});

const appNS = io.of("/appname");
appNS.on("connection", (socket) => {
  appNS.emit("joined", `joined ${socket.id}`);

  socket.on("message", (message) => {
    console.log(`${socket.id} has sent: ${message}`);
    appNS.except(socket.id).emit("delivered", true);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} has left`);
  });
});

const start = async () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
        projectId: serviceAccount.project_id,
      }),
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
