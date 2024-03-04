import path from "path";
import "express-async-errors";
import express from "express";
import { json } from "body-parser";

import cookieSession from "cookie-session";
import { NODE_ENV } from "./env";
import cors from "cors";

import { NotFoundError, errorHandler } from "@com.xcodeclazz/monolithic-common";
import { dependenciesConnections } from "./middlewares/dependencies-connections";
import { celebrate_custome_errors } from "@com.xcodeclazz/celebrate";

import { authShowUserCurrentRouter } from "./routes/auth/show-user-current";
import { authUserAdminRemoveRouter } from "./routes/auth/user-admin-remove";
import { authUserAdminMakeRouter } from "./routes/auth/user-admin-make";
import { authUserRegisterRouter } from "./routes/auth/user-register";
import { authUserLogoutRouter } from "./routes/auth/user-logout";
import { authUserLoginRouter } from "./routes/auth/user-login";

import { commonDropCollectionsRouter } from "./routes/common/drop-collections";
import { commonMetricsRouter } from "./routes/common/metrics";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(cors({ origin: "*", exposedHeaders: ["base64"] }));
app.use(
  cookieSession({
    signed: false,
    secure: NODE_ENV !== "test",
  })
);
if (process.env.NODE_ENV === "production") app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use(dependenciesConnections);

////////////
// WARNING: PLEASE DON'T CHANGE THE ROUTE ORDER
////////////

app.use(authShowUserCurrentRouter);
app.use(authUserRegisterRouter);
app.use(authUserAdminRemoveRouter);
app.use(authUserLogoutRouter);
app.use(authUserLoginRouter);
app.use(authUserAdminMakeRouter);

app.use(commonDropCollectionsRouter);
app.use(commonMetricsRouter);

app.all("*", (req, res) => {
  if (process.env.NODE_ENV === "test") throw new NotFoundError();
  else if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  } else res.json({ message: "appname" });
});

app.use(celebrate_custome_errors());
app.use(errorHandler);

export { app };
