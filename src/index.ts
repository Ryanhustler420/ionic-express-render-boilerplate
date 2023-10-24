import http from "http";
import path from "path";
import cors from "cors";
import express from "express";
import socketIO from "socket.io";
import { rateLimit } from "express-rate-limit";

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
  })
);

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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
