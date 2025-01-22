import jwt from "jsonwebtoken";
import config from "../config/index.ts";
import MUser from "../database/model/user.ts";
import { NextFunction, Request, Response } from "express";
import print from "../utils/console.ts";
import { IUser } from "../types/mongo.ts";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const verify = (req: Request, res: Response, next: NextFunction) => {
  try {
    // skip auth route
    if (req.path === "/api/auth/login" || req.path === "/api/auth/register") {
      return next();
    }

    // check if authorization header is set
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "authorization header not found" });
    }

    const token = req.headers.authorization.split(" ")[1];

    // check if token is set
    if (!token) {
      return res.status(401).json({ error: "token not found" });
    }

    // verify token
    jwt.verify(token, config.jwt, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "invalid jwt token" });
      }
      try {
        // check if user exists
        if (decoded && typeof decoded === "object" && "_id" in decoded) {
          const user = await MUser.findById(decoded._id);
          if (!user) return res.status(401).json({ error: "user not found" });
          if (user._id) {
            req.userId = user._id.toString();
          }
        }
        next();
      } catch (error) {
        res.status(401).json({ error: "user not found" });
      }
    });
  } catch (error) {
    print(error as string, "red");
    res.status(500).json({ error: "internal server error" });
  }
};

export default verify;
