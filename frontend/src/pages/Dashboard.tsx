import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { getProjects } from "../api/projectsApi";
import { getMyTasks, updateTaskStatus } from "../api/tasksApi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    
    Promise.all([
        getProjects(token),
        getMyTasks(token)
    ])
    .then(([projectsData, tasksData]) => {
        setProjects(projectsData);
        setTasks(tasksData);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [token]);

  const handleStatusChange = async (taskId: string, status: "IN_PROGRESS" | "DONE" | "CANCELLED") => {
    if (!token) return;
    try {
      await updateTaskStatus(taskId, status, token);
      // Reload tasks
      getMyTasks(token).then(setTasks);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      
      <section style={{ marginBottom: "30px" }}>
        <h2>Welcome, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <section>
            <h2>My Tasks (Assigned to Me)</h2>
            {tasks.length === 0 && <p>No tasks assigned to you yet.</p>}
            {tasks.map((task) => {
                const isOverdue =
                task.deadline &&
                new Date(task.deadline) < new Date() &&
                task.status !== "APPROVED";

                return (
                    <div key={task.taskid} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <strong>{task.title}</strong>
                            <span style={{ fontSize: "0.8em", color: "#666" }}>{task.projectname}</span>
                        </div>
                        <div>Status: {task.status}</div>
                        
                        {task.deadline && (
                        <div style={{ fontSize: "0.9em" }}>
                            Deadline: {new Date(task.deadline).toLocaleDateString()}
                            {isOverdue && <span style={{ color: "red" }}> (OVERDUE)</span>}
                        </div>
                        )}

                        <div style={{ marginTop: "10px" }}>
                            {task.status === "CREATED" && (
                                <button onClick={() => handleStatusChange(task.taskid, "IN_PROGRESS")}>Start</button>
                            )}
                            {task.status === "IN_PROGRESS" && (
                                <button onClick={() => handleStatusChange(task.taskid, "DONE")}>Complete</button>
                            )}
                        </div>
                    </div>
                );
            })}
        </section>

        <section>
            <h2>My Project Groups</h2>
            {projects.length === 0 && <p>You are not in any groups yet.</p>}
            {projects.map((project) => (
            <div key={project.projectid} style={{ border: "1px solid #eee", padding: "15px", marginBottom: "10px", borderRadius: "5px" }}>
                <strong>
                    <Link to={`/groups/${project.projectid}`}>{project.name}</Link>
                </strong>
                <div style={{ fontSize: "0.9em", color: "#666" }}>Role: {project.role}</div>
                <div style={{ fontSize: "0.8em" }}>Created: {new Date(project.createdat).toLocaleDateString()}</div>
            </div>
            ))}
        </section>
      </div>
    </div>
  );
}
