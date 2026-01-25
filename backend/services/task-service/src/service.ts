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

export async function updateTaskStatus(
  taskId: string,
  userId: string,
  status: "IN_PROGRESS" | "DONE" | "CANCELLED",
) {
  const res = await pool.query(
    `SELECT ownerId,projectId ,status FROM tasks where taskId=$1`,
    [taskId],
  );

  if (res.rowCount === 0) {
    throw new Error("Task not found");
  }

  const task = res.rows[0];

  if (task.ownerId !== userId) {
    throw new Error("Only the task owner can update the status");
  }

  if (task.status === status) {
    return;
  }

  await pool.query(`UPDATE task set status = $1 where taskId=$2`, [
    status,
    taskId,
  ]);

  await recordEvent({
    project_id: task.project_id,
    user_id: userId,
    type: "TASK_STATUS_CHANGED",
    source: "task-service",
    metadata: { taskId, from: task.status, to: status },
  });
}
