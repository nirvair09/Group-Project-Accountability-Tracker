import { apiFetch } from "./http";

export function getTasksByProject(projectId: string, token: string) {
  return apiFetch(
    `http://localhost:4003/tasks?projectId=${projectId}`,
    {},
    token
  );
}

export function createTask(data: any, token: string) {
  return apiFetch(
    "http://localhost:4003/tasks",
    {
      method: "POST",
      body: JSON.stringify(data)
    },
    token
  );
}

export function updateTaskStatus(
  taskId: string,
  status: string,
  token: string
) {
  return apiFetch(
    `http://localhost:4003/tasks/${taskId}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({ status })
    },
    token
  );
}

export function approveTask(taskId: string, token: string) {
  return apiFetch(
    `http://localhost:4003/tasks/${taskId}/approve`,
    { method: "PATCH" },
    token
  );
}
