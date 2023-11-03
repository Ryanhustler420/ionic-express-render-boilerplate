import jwt from "jsonwebtoken";
import { JWT_KEY } from "../env";
import admin from "firebase-admin";
import { User } from "../models/key/user";
import { Password } from "../services/password";
import express, { Request, Response } from "express";
import cookieConfig from "../services/cookie-config";
import { celebrate, Joi, Segments } from "@xcc.com/xcc-celebrate";
import {
  custom_jwt,
  currentUser,
  notRequireAuth,
  BadRequestError,
} from "@xcc.com/xcc-common";

const router = express.Router();

router.post(
  "/api/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(5).required(),
    },
  }),
  currentUser,
  notRequireAuth,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError("Invalid credentials");

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) throw new BadRequestError("Invalid credentials");
    if (existingUser.is_banned) throw new BadRequestError("You are banned");

    const firebase = await admin
      .auth()
      .getUserByEmail(email)
      .catch((e) => {
        throw new BadRequestError(e.message);
      });
    if (firebase) {
      // Generate JWT
      const userJwt = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        JWT_KEY!
      );

      // Store it on session object
      req.session = { jwt: userJwt };
      res.setHeader("base64", custom_jwt.encode(userJwt));
      res
        .cookie("Set-Cookie", custom_jwt.encode(userJwt), cookieConfig)
        .status(200)
        .send(existingUser);
    } else {
      throw new BadRequestError("Wrong credentials");
    }
  }
);

export { router as userLoginRouter };
