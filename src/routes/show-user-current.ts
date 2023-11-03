import express from "express";
import { currentUser } from "@xcc.com/xcc-common";

const router = express.Router();

router.get("/api/currentuser", currentUser, async (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as showUserCurrentRouter };
