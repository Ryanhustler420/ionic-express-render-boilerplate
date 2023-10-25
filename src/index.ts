import http from "http";
import path from "path";
import cors from "cors";
import express from "express";
import socketIO from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);

const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: { origin: "*" },
  path: "/deep/socket",
});

const PORT = process.env.PORT || 8080;
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

if (process.env.NODE_ENV != "development") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

app.get("/api", (req, res) => {
  res.json({ message: "welcome to api" });
});

app.all("*", async (req, res) => {
  res.redirect("/");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
