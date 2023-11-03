import path from "path";
import "express-async-errors";
import express from "express";
import { json } from "body-parser";

import cookieSession from "cookie-session";
import { NODE_ENV } from "./env";
import cors from "cors";

import { errorHandler } from "@xcc.com/xcc-common";
import { celebrate_custome_errors } from "@xcc.com/xcc-celebrate";

import { showUserCurrentRouter } from "./routes/show-user-current";
import { dropCollectionsRouter } from "./routes/drop-collections";
import { healthChecksRouter } from "./routes/health-checks";
import { userRegisterRouter } from "./routes/user-register";
import { userLogoutRouter } from "./routes/user-logout";
import { userLoginRouter } from "./routes/user-login";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(cors({ origin: "*", exposedHeaders: ["base64"] }));
app.use(cookieSession({ signed: false, secure: NODE_ENV !== "test" }));

app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.use(showUserCurrentRouter);
app.use(dropCollectionsRouter);
app.use(healthChecksRouter);
app.use(userRegisterRouter);
app.use(userLogoutRouter);
app.use(userLoginRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.all("*", async (req, res) => {
  // throw new NotFoundError();
  res.redirect("/");
});
app.use(celebrate_custome_errors());
app.use(errorHandler);

export { app };
