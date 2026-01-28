import "dotenv/config";
import { pool } from "./shared";
import fs from "fs";
import path from "path";

async function initDb() {
  try {
    console.log("Reading schema.sql...");
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("Executing schema...");
    await pool.query(schema);
    
    console.log("Database initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

initDb();
