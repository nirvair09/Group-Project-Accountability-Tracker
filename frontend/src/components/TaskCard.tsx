import { projects } from "../data/projects";
import { users } from "../data/users";
import type { Task } from "../types";

export default function TaskCard({ task }: { task: Task }) {
  const owner = users.find((u) => u.id === task.ownerId);

  const project = projects.find((p) => p.id === task.projectId);

  const isOverDue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "DONE";

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.deadline}</p>
      <p>Status: {task.status}</p>
    </div>
  );
}
