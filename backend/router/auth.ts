import express, { Request, Response } from "express";
import Auth from "../controller/auth.js";

const router = express.Router();
const auth = new Auth();

router.route("/login").post(async (req: Request, res: Response) => {
  await auth.login(req, res);
});

router.route("/register").post(async (req: Request, res: Response) => {
  await auth.register(req, res);
});

router.route("/me").post(async (req: Request, res: Response) => {
  await auth.me(req, res);
});

export default router;
