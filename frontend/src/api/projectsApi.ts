import { apiFetch } from "./http";

const BASE = "http://localhost:4002";

export function getProjects(token: string) {
  return apiFetch(`${BASE}/projects`, {}, token);
}

export function createProject(name: string, token: string) {
  return apiFetch(
    `${BASE}/projects`,
    {
      method: "POST",
      body: JSON.stringify({ name })
    },
    token
  );
}

export function addProjectMember(
  projectId: string,
  userId: string,
  role: "MEMBER",
  token: string
) {
  return apiFetch(
    `${BASE}/projects/${projectId}/members`,
    {
      method: "POST",
      body: JSON.stringify({ userId, role })
    },
    token
  );
}

export function getProjectMembers(projectId: string, token: string) {
  return apiFetch(`${BASE}/projects/${projectId}/members`, {}, token);
}

export function getProjectById(projectId: string, token: string) {
    return apiFetch(`${BASE}/projects/${projectId}`, {}, token);
}
