import { projects } from "../data/projects";
import { projectMembers } from "../data/projectMembers";
import type { Project, ProjectMember } from "../types";

export function getProjects(): Promise<Project[]> {
  return Promise.resolve(projects);
}

export function getProjectById(id: string): Promise<Project | undefined> {
  return Promise.resolve(projects.find((p) => p.id === id));
}

export function getProjectMembers(projectId: string): Promise<ProjectMember[]> {
  return Promise.resolve(
    projectMembers.filter((m) => m.projectId === projectId),
  );
}
