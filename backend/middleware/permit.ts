import express from "express";
import { RequestWithUser } from "./authentication";

const permit = (...role: string[]) => {
  return (
    expressReq: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const req = expressReq as RequestWithUser;

    if (!req.user) {
      res.status(401).send({ message: "Not authenticated" });
      return;
    }

    if (!role.includes(req.user.role)) {
      res.status(403).send({ message: "Not authorized" });
      return;
    }

    next();
  };
};

export default permit;
