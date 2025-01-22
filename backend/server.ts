import Express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import print from "./utils/console.ts";

import authRoute from "./router/auth.ts";
import taskRoute from "./router/tasks.ts";

import { connectDB } from "./database/connect.ts";
import verify from "./middleware/verify.ts";

connectDB();

const app = Express();
const port = 3001;

app.use(Express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  verify(req, res, next);
});

app.use("/api/auth", authRoute);
app.use("/api/task", taskRoute);

app.listen(port, () => {
  print(`server is running on port ${port}`, "cyan");
});
