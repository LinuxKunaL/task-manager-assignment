import Express from "express";
import cors from "cors";
import print from "./utils/console.ts";

const app = Express();
const port = 3001;

app.use(Express.json());
app.use(cors());

app.listen(port, () => {
  print(`server is running on port ${port}`, "cyan");
});
