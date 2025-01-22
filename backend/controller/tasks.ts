import { Request, Response } from "express";
import { MTask } from "../database/model/task";

class Tasks {
  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await MTask.find({ user: req?.userId });
      return res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      await MTask.deleteOne({ _id: req.query.id });
      return res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  async putTask(req: Request, res: Response) {
    try {
      await MTask.create({ ...req.body, status: "pending", user: req?.userId });
      return res.status(200).json({ success: true, message: "Task created" });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  async checkTask(req: Request, res: Response) {
    try {
      const task = await MTask.findOne({ _id: req.body.id });

      await MTask.findOneAndUpdate(
        { _id: req.body.id },
        {
          status: task?.status === "pending" ? "completed" : "pending",
          updatedAt: new Date().toLocaleString(),
        }
      );
      return res.status(200).json({ success: true, message: "Task updated" });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id, data } = req.body;
      await MTask.findOneAndUpdate(
        { _id: id },
        { ...data, updatedAt: new Date().toLocaleString()}
      );
      return res.status(200).json({ success: true, message: "Task updated" });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  }
}

export default Tasks;
