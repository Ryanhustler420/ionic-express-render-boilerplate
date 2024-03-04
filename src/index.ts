import { app } from "./app";
import sockets from "./sockets";
import mongoose from "mongoose";
import { spawn } from "child_process";
import { rabbitMqWrapper } from "./mq/rabbitmq-wrapper";
import { PORT, DATABASE, MONGO_URI, RABBIT_MQ } from "./env";
import { DependenciesConnections } from "@com.xcodeclazz/monolithic-common";

const server = sockets(app);

const start = async () => {
  try {
    await mongoose.connect(`${MONGO_URI}/${DATABASE}`);
    // await rabbitMqWrapper.connect(RABBIT_MQ);
    console.log("Connected to MongoDB");
    spawn("/usr/local/bin/node_exporter", {
      detached: false,
      stdio: "inherit",
    }).unref();
  } catch (err) {
    console.error("====================================");
    // @ts-ignore
    console.error(err?.message);
    console.error("====================================");
    DependenciesConnections.getInstance().setMongoDb(false);
  }

  const HOST = "0.0.0.0";
  server.listen(PORT, HOST, () => {
    console.log(`Server is on http://${HOST}:${PORT}`);
  });
};

start();
