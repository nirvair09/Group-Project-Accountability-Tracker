import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import { pool } from "../../../shared/db";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PROJECT_PORT, async () => {
  console.log("Project Service is running on port:", process.env.PROJECT_PORT);
  try {
    await pool.query("SELECT NOW()");
    console.log("DB Connected");
  } catch (e) {
    console.error("DB Connection Failed", e);
  }
});
