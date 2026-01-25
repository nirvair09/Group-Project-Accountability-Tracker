import { pool } from "../../../shared/db";
import { recordEvent } from "../../../shared/events/recordEvent";
import { v4 as uuid } from "uuid";

export async function createTask(data: {
  projectId: string;
  title: string;
  ownerId: string;
  deadline?: string;
}) {
  const taskId = uuid();

  await pool.query(
    `
        INSERT INTO tasks
        
        (taskId,projectId,ownerId,title,status,deadline)
        VALUES ($1,$2,$3,$4,'CREATED',$5)`,
    [taskId, data.projectId, data.ownerId, data.title, data.deadline || null],
  );
}
