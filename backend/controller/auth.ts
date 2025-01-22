import { Request, Response } from "express";
import MUser from "../database/model/user.ts";
class Auth {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("All fields are required");
      }

      const user = await MUser.findOne({ email });

      if (user === null) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = await user.generateToken();

      res.status(200).json({
        success: true,
        message: "Login successful ✅",
        token,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({
          error: error.message,
        });
      }
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new Error("All fields are required");
      }

      await MUser.create({ name, email, password });

      res.status(201).json({
        message: "User registered successfully ✅",
        success: true,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "MongoServerError") {
        return res.status(409).json({ error: "Email already exists" });
      }
      return res
        .status(500)
        .json({ error: error instanceof Error && error.message });
    }
  };

  me = async (req: Request, res: Response) => {
    try {
      const _id = req.userId;
      const user = await MUser.findById(_id, {
        password: 0,
        __v: 0,
        createdAt: 0,
      });
      res.status(200).json({ success: true, user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  };
}
export default Auth;
