import express from "express";
import { ENV } from "../env";
import { User } from "../models/key/user";
import { BadRequestError } from "@xcc.com/xcc-common";

const router = express.Router();

router.post("/api/drop/collections", async (req, res) => {
  if (ENV() == "development") {
    try {
      await User.deleteMany({});
      res.send({
        key: [], // Please mention which collection has droped from /key
        backup: ["User"], // Please mention which collection has droped from /backup
      });
    } catch (error) {
      new BadRequestError("Error occurred while dropping collections");
    }
  } else {
    res.send({ message: "You can't perform as of now" });
  }
});

export { router as dropCollectionsRouter };
