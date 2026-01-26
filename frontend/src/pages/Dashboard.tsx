import TaskCard from "../components/TaskCard";
import { tasks } from "../data/tasks";
import { CURRENT_USER_ID } from "../constants/currentUser";

export default function Dashboard() {
  const myTask = tasks.filter((task) => task.ownerId === CURRENT_USER_ID);

  const overDueTasks = myTask.filter(
    (task) =>
      task.deadline &&
      new Date(task.deadline) < new Date() &&
      task.status !== "COMPLETED",
  );

  const upComingTask = myTask.filter(
    (task) =>
      task.deadline &&
      new Date(task.deadline) >= new Date() &&
      task.status !== "COMPLETED",
  );

  return (
    <div>
      {overDueTasks.length > 0 && (
        <section>
          <h2>Overdue Tasks</h2>
          {overDueTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      )}

      <section>
        <h1>My Tasks</h1>
        {myTask.length === 0 && <p>No task assigned to you</p>}
        {myTask.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>

      {upComingTask.length > 0 && (
        <section>
          <h2>Upcoming Tasks</h2>
          {upComingTask.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </section>
      )}
    </div>
  );
}
