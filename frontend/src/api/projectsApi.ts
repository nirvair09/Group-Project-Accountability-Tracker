import { apiFetch } from "./http";

export function getMyProjects(token: string) {
  return apiFetch(
    "http://localhost:4002/projects",
    {},
    token
  );
}

export function createProject(name: string, token: string) {
  return apiFetch(
    "http://localhost:4002/projects",
    {
      method: "POST",
      body: JSON.stringify({ name })
    },
    token
  );
}
