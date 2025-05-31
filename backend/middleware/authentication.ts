import { NextFunction, Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import { IUser } from "../types";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import User, {JWT} from "../models/User";

export interface RequestWithUser extends Request {
  user: HydratedDocument<IUser>;
}

const authentication = async (
  expressReq: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const req = expressReq as RequestWithUser;
    const jwtToken = req.get("Authorization")?.replace("Bearer ", "");

    if (!jwtToken) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(jwtToken, JWT) as { _id: string };
    const user = await User.findOne({ _id: decoded._id, token: jwtToken });

    if (!user) {
      res.status(401).send({ error: "User not found or invalid token" });
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      res.status(401).send({ error: "Token expired" });
    } else {
      res.status(401).send({ error: "Please login to authenticate" });
    }
  }
};

export default authentication;
