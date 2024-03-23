import express from "express";
import { ADMIN_PASSWORD } from "../../env";
import { encode } from "@com.xcodeclazz/session-controller";
import { AuthResponse_LogoutUser, currentUser, requireAuth } from "@com.xcodeclazz/monolithic-common";

const router = express.Router();

router.post("/api/auth/logout", currentUser, requireAuth, async (req, res) => {
  req.session = null;
  res.setHeader("base64", "");
  const response: AuthResponse_LogoutUser = {
    session: encode({ email: req.currentUser!.email }, ADMIN_PASSWORD)
  };
  res.cookie("Set-Cookie", "").send(response);
});

export { router as authUserLogoutRouter };
