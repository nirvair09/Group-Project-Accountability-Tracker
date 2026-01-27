import { apiFetch } from "./http";

const BASE = "http://localhost:4003";

export function getTasksByProject(projectId: string, token: string) {
  return apiFetch(
    `${BASE}/projects/${projectId}/tasks`,
    {},
    token
  );
}

export function getMyTasks(token: string) {
    return apiFetch(
      `${BASE}/tasks/mine`,
      {},
      token
    );
}

export function createTask(
  projectId: string,
  title: string,
  deadline: string,
  token: string,
  ownerId?: string
) {
  return apiFetch(
    `${BASE}/tasks`,
    {
      method: "POST",
      body: JSON.stringify({ projectId, title, deadline, ownerId })
    },
    token
  );
}

export function updateTaskStatus(
  taskId: string,
  status: "IN_PROGRESS" | "DONE" | "CANCELLED",
  token: string
) {
  return apiFetch(
    `${BASE}/tasks/${taskId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status })
    },
    token
  );
}

export function approveTask(taskId: string, token: string) {
  return apiFetch(
    `${BASE}/tasks/${taskId}/approve`,
    { method: "PATCH" },
    token
  );
}
