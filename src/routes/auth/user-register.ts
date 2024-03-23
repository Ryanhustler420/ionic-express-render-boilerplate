import _ from "lodash";
import jwt from "jsonwebtoken";
import { User } from "../../models/key/user";
import { ADMIN_PASSWORD, JWT_KEY } from "../../env";
import express, { Request, Response } from "express";
import { encode } from "@com.xcodeclazz/session-controller";
import { Segments, celebrate } from "@com.xcodeclazz/celebrate";
import {
  Roles,
  custom_jwt,
  currentUser,
  notRequireAuth,
  BadRequestError,
  AuthResponse_RegisterUser,
  AuthPayloadJoi_RegisterUser,
} from "@com.xcodeclazz/monolithic-common";

const router = express.Router();

router.post(
  "/api/auth/register",
  celebrate({ [Segments.BODY]: AuthPayloadJoi_RegisterUser }),
  currentUser,
  notRequireAuth,
  async (req: Request, res: Response) => {
    const {
      name,
      address,
      city,
      state,
      country,
      dob,
      gender,
      avatar,
      phone,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("This email address is already in use");
    }

    const user = User.build({
      dob,
      city,
      name,
      state,
      phone,
      email,
      gender,
      avatar,
      country,
      address,
      password,
      is_banned: false,
      roles: [Roles.NORMAL],
    });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email, roles: user.roles },
      JWT_KEY!
    );

    // Store it on session object
    req.session = { jwt: userJwt };
    res.setHeader("base64", custom_jwt.encode(userJwt));

    const response: AuthResponse_RegisterUser = {
      user: user,
      session: encode({ email: user.email }, ADMIN_PASSWORD),
    };
    res.status(201).send(response);
  }
);

export { router as authUserRegisterRouter };
