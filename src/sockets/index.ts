import http from "http";
import { Server } from "socket.io";
import { Express } from "express";
import { chatSockets } from "./sockets-chat";

export default function (app: Express) {
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "*" }, path: "/deep/socket", });

  io.use((socket, next) => {
    next();
    // is part of a room
    // type of operation
    // session expired
    // is blocked list
    // prevent mislinious user who spam the socket
  });

  // Middleware for Socket.IO authentication
  // io.use((socket, next) => {
  //   try {
  //     const authToken = socket.handshake.auth.token;
  //     const authToken2 = socket.handshake.headers.token;

  //     if (authToken === "validToken") {
  //       socket.data = {};
  //       return next(); // Authentication successful
  //     } else {
  //       return next(new Error("Authentication failed")); // Authentication failed
  //     }
  //   } catch (error) {}
  // });

  chatSockets(io);

  return server;
}

// io.disconnectSockets();
