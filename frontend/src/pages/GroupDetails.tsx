import { useParams } from "react-router-dom";
import { tasks } from "../data/tasks";
import { users } from "../data/users";
import { projects } from "../data/projects";
import type { TaskStatus } from "../types";

const STATUS_ORDER: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "COMPLETED",
  "AWAITING_APPROVAL",
  "APPROVED",
];

export default function GroupDetail() {
  const { groupId } = useParams();

  const project = projects.find((p) => p.id === groupId);

  const groupTasks = tasks.filter((t) => t.projectId === groupId);

  if (!project) {
    return <p>Group not found.</p>;
  }

  return (
    <div>
      <h1>{project.name}</h1>

      <h2>Tasks</h2>

      {STATUS_ORDER.map((status) => {
        const tasksByStatus = groupTasks.filter((t) => t.status === status);

        if (tasksByStatus.length === 0) return null;

        return (
          <div key={status}>
            <h3>{status.replace("_", " ")}</h3>

            {tasksByStatus.map((task) => {
              const owner = users.find((u) => u.id === task.ownerId);

              const isOverdue =
                task.deadline &&
                new Date(task.deadline) < new Date() &&
                task.status !== "APPROVED";

              return (
                <div key={task.id}>
                  <strong>{task.title}</strong>
                  <div>Owner: {owner?.name}</div>
                  {task.deadline && (
                    <div>
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                      {isOverdue && " (OVERDUE)"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
