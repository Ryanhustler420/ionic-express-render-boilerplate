import { Roles, newObjectId } from "@xcc.com/xcc-common";
import { JWT_KEY } from "../env";
import jwt from "jsonwebtoken";

export const register = async (roles: Roles[], id?: string) => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id || newObjectId(),
    email: "example@domain.com",
    roles,
  };

  // Create the JWT!
  const token = jwt.sign(payload, JWT_KEY!);

  // Build the session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};

export const register2 = async (user: any, id?: string) => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: id || newObjectId(),
    email: user.email,
    roles: user.roles,
  };

  // Create the JWT!
  const token = jwt.sign(payload, JWT_KEY!);

  // Build the session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
