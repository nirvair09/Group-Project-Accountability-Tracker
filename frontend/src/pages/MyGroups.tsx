import { projects } from "../data/projects";
import { projectMembers } from "../data/projectMembers";
import { tasks } from "../data/tasks";
import { CURRENT_USER_ID } from "../constants/currentUser";
import { Link } from "react-router-dom";

export default function MyGroups() {
  const myGroupIds = projectMembers
    .filter((m) => m.userId === CURRENT_USER_ID)
    .map((m) => m.projectId);
  const myGroups = projects.filter((m) => myGroupIds.includes(m.id));

  return (
    <div>
      <h1>My Groups</h1>

      {myGroups.length === 0 && <p>You are not a member of any Group so far</p>}

      {myGroups.map((group) => {
        const groupTasks = tasks.filter((t) => t.projectId === group.id);

        const pendingTasks = groupTasks.filter(
          (t) => t.status !== "COMPLETED",
        ).length;

        const overdueTasks = groupTasks.filter(
          (t) =>
            t.status !== "COMPLETED" &&
            t.deadline &&
            new Date(t.deadline) < new Date(),
        ).length;

        return (
          <div key={group.id}>
            <h3>
              <Link to={`/groups/${group.id}`}>{group.name}</Link>
            </h3>
            <p>Pending Tasks: {pendingTasks}</p>
            <p>Overdue Tasks: {overdueTasks}</p>
          </div>
        );
      })}
    </div>
  );
}
