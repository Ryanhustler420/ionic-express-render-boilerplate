import express from "express";
import { currentUser, requireAuth } from "@xcc.com/xcc-common";

const router = express.Router();

router.post("/api/logout", currentUser, requireAuth, async (req, res) => {
  const uid = req.currentUser!.id;
  req.session = null;
  res.setHeader("base64", "");
  res.cookie("Set-Cookie", "").send({});
});

export { router as userLogoutRouter };
