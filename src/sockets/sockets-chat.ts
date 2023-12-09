import { Server, Socket } from "socket.io";

// ::messaeg -> every on() on the server side
// ~message -> every on() on client sider
let chats = new Map<string, {}[]>();

export const chatSockets = (io: Server) => {
  const appNS = io.of("/appname");
  appNS.on("connection", (socket: Socket) => {
    socket.on("message", (payload) => {
      socket.to("rid").emit("~message", payload);
    });
  });
};
