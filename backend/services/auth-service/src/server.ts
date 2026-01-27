import { app } from "./app";
import { env } from "./config/env";

import { pool } from "./config/db";

app.listen(env.PORT, async () => {
  console.log(`Auth service running on port ${env.PORT}`);
  try {
    await pool.query("SELECT NOW()");
    console.log("DB Connected");
  } catch (e) {
    console.error("DB Connection Failed", e);
  }
});
