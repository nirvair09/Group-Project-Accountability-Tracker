import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (red, res) => {
  res.json({ status: "sabb changa sii", service: "task-service" });
});

app.listen(process.env.TASK_PORT, () => {
  console.log("Task Service is running on port:", process.env.TASK_PORT);
});
