import express, { Request, Response } from "express";
import Tasks from "../controller/tasks.js";

const router = express.Router();
const tasks = new Tasks();

router
  .route("/")
  .get(async (req: Request, res: Response) => {
    tasks.getTasks(req, res);
  })
  .post(async (req: Request, res: Response) => {
    tasks.checkTask(req, res);
  })
  .delete((req: Request, res: Response) => {
    tasks.deleteTask(req, res);
  })
  .put((req: Request, res: Response) => {
    tasks.putTask(req, res);
  })
  .patch((req: Request, res: Response) => {
    tasks.updateTask(req, res);
  });

export default router;
