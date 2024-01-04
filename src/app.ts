import path from "path";
import "express-async-errors";
import express from "express";
import { json } from "body-parser";

import cookieSession from "cookie-session";
import cookieConfig from "./services/cookie-config";
import cors from "cors";

import { errorHandler } from "@com.xcodeclazz/monolithic-common";
import { celebrate_custome_errors } from "@com.xcodeclazz/celebrate";

import { authDropCollectionsRouter } from "./routes/auth/drop-collections";
import { authShowUserCurrentRouter } from "./routes/auth/show-user-current";
import { authUserAdminRemoveRouter } from "./routes/auth/user-admin-remove";
import { authUserAdminMakeRouter } from "./routes/auth/user-admin-make";
import { authUserRegisterRouter } from "./routes/auth/user-register";
import { authUserLogoutRouter } from "./routes/auth/user-logout";
import { authUserLoginRouter } from "./routes/auth/user-login";
import { authMetricsRouter } from "./routes/auth/metrics";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(cors({ origin: "*", exposedHeaders: ["base64"] }));
app.use(cookieSession(cookieConfig));
if (process.env.NODE_ENV === "production") app.use(express.static(path.join(__dirname, "..", "client", "build")));

////////////
// WARNING: PLEASE DON'T CHANGE THE ROUTE ORDER
////////////

app.use(authShowUserCurrentRouter);
app.use(authUserRegisterRouter);
app.use(authUserAdminRemoveRouter);
app.use(authUserLogoutRouter);
app.use(authUserLoginRouter);
app.use(authUserAdminMakeRouter);
app.use(authDropCollectionsRouter);
app.use(authMetricsRouter);

app.get("/", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  } else res.json({ message: "NO UI FOUND" });
});

app.all("*", async (req, res) => {
  // throw new NotFoundError();
  res.redirect("/");
});
app.use(celebrate_custome_errors());
app.use(errorHandler);

export { app };
