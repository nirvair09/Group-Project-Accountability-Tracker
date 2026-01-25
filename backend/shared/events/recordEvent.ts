import { Pool } from "pg";
import { EvidenceEvent } from "./types";
import { v4 as uuid } from "uuid";

export async function recordEvent(
  event: Omit<EvidenceEvent, "event_id" | "timestamp">,
) {
  await pool.query(
    `INSERT INTO evidence_events
        (event_id,project_id,user_id,type,source,timestamp,metadata)
        VALUES ($1,$2,$3,$4,$5,NOW(),$6)`,
    [
      uuid(),
      event.project_id,
      event.user_id,
      event.type,
      event.source,
      event.metadata,
    ],
  );
}
