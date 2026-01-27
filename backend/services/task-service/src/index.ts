import "dotenv/config";
import express from "express";
import cors from "cors";
import taskRoutes from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

// app.get("/health", (req: Request, res: Response) => {
//   res.json({ status: "sabb changa sii", service: "task-service" });
// });

app.use(taskRoutes);

import { pool } from "../../../shared/db";

app.listen(process.env.TASK_PORT, async () => {
  console.log("Task Service is running on port:", process.env.TASK_PORT);
  try {
    await pool.query("SELECT NOW()");
    console.log("DB Connected");
  } catch (e) {
    console.error("DB Connection Failed", e);
  }
});
