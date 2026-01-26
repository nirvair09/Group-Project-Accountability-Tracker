import { tasks } from "../data/tasks";
import type { Task } from "../types";

export function getTasks(): Promise<Task[]> {
  return Promise.resolve(tasks);
}

export function getTasksByProject(projectId: string): Promise<Task[]> {
  return Promise.resolve(tasks.filter((t) => t.projectId === projectId));
}

export function getTasksByUser(userId: string): Promise<Task[]> {
  return Promise.resolve(tasks.filter((t) => t.ownerId === userId));
}
