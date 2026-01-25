import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

// app.get("/health", (req: Request, res: Response) => {
//   res.json({ status: "sabb changa sii", service: "task-service" });
// });

app.use(taskRoutes);

app.listen(process.env.TASK_PORT, () => {
  console.log("Task Service is running on port:", process.env.TASK_PORT);
});
