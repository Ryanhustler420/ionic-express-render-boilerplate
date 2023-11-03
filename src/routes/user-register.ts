import _ from "lodash";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env";
import admin from "firebase-admin";
import { User } from "../models/key/user";
import express, { Request, Response } from "express";
import cookieConfig from "../services/cookie-config";
import { Joi, Segments, celebrate } from "@xcc.com/xcc-celebrate";
import {
  custom_jwt,
  currentUser,
  notRequireAuth,
  BadRequestError,
} from "@xcc.com/xcc-common";

const router = express.Router();

router.post(
  "/api/register",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().trim().not().empty().required(),
      address: Joi.string().trim().not().empty().required(),
      avatar: Joi.string().trim().not().empty().required(),
      phone: Joi.string().trim().not().empty().required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(4).required(),
    },
  }),
  currentUser,
  notRequireAuth,
  async (req: Request, res: Response) => {
    const { name, address, avatar, phone, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      throw new BadRequestError("This email address is already in use");

    const firebase = await admin
      .auth()
      .createUser({ email, password })
      .catch((e) => {
        throw new BadRequestError(e.message);
      });
    if (firebase) {
      const user = User.build({
        name,
        phone,
        email,
        avatar,
        address,
        password,
        is_banned: false,
      });
      await user.save();

      const userJwt = jwt.sign({ id: user.id, email: user.email }, JWT_KEY!);

      req.session = { jwt: userJwt };
      res.setHeader("base64", custom_jwt.encode(userJwt));
      res
        .cookie("Set-Cookie", custom_jwt.encode(userJwt), cookieConfig)
        .status(201)
        .send(user);
    } else {
      throw new BadRequestError("User registration failed");
    }
  }
);

export { router as userRegisterRouter };
