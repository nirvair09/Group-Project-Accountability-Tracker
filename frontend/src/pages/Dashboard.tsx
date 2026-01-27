import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { getProjects } from "../api/projectsApi";
import { getMyTasks, updateTaskStatus, approveTask } from "../api/tasksApi";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    
    setLoading(true);
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

  const handleApprove = async (taskId: string) => {
    if (!token) return;
    try {
      await approveTask(taskId, token);
      getMyTasks(token).then(setTasks);
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading Dashboard...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Dashboard</h1>
      
      <section style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h2>Welcome back, {user?.name}! 👋</h2>
        <p style={{ color: "#666" }}>You have <strong>{tasks.filter(t => t.status !== 'APPROVED' && t.status !== 'CANCELLED').length}</strong> active tasks requiring your attention.</p>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px" }}>
        <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h2 style={{ margin: 0 }}>My Tasks</h2>
                <Link to="/tasks" style={{ fontSize: "0.9em", color: "#007bff", textDecoration: "none" }}>Show all</Link>
            </div>
            
            {tasks.length === 0 ? (
                <div style={{ padding: "30px", textAlign: "center", border: "1px dashed #ccc", borderRadius: "8px", color: "#666" }}>
                    No tasks assigned to you yet.
                </div>
            ) : (
                tasks.map((task) => {
                    const isOverdue =
                    task.deadline &&
                    new Date(task.deadline) < new Date() &&
                    task.status !== "APPROVED";

                    return (
                        <div key={task.taskid} style={{ border: "1px solid #ccc", padding: "15px", marginBottom: "10px", borderRadius: "5px", backgroundColor: "white" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                <strong>{task.title}</strong>
                                <span style={{ fontSize: "0.75em", color: "#666", padding: "2px 6px", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
                                    {task.projectname}
                                </span>
                            </div>
                            <div style={{ fontSize: "0.9em", color: "#666" }}>Status: {task.status}</div>
                            
                            {task.deadline && (
                            <div style={{ fontSize: "0.85em", marginTop: "5px", color: isOverdue ? "red" : "#666" }}>
                                Deadline: {new Date(task.deadline).toLocaleDateString()}
                                {isOverdue && <strong> (OVERDUE)</strong>}
                            </div>
                            )}

                            <div style={{ marginTop: "12px", display: "flex", gap: "5px" }}>
                                {task.status === "CREATED" && (
                                    <button 
                                        onClick={() => handleStatusChange(task.taskid, "IN_PROGRESS")}
                                        style={{ padding: "4px 12px", cursor: "pointer", borderRadius: "4px", backgroundColor: "#007bff", color: "white", border: "none" }}
                                    >
                                        Start
                                    </button>
                                )}
                                {task.status === "IN_PROGRESS" && (
                                    <button 
                                        onClick={() => handleStatusChange(task.taskid, "DONE")}
                                        style={{ padding: "4px 12px", cursor: "pointer", borderRadius: "4px", backgroundColor: "#28a745", color: "white", border: "none" }}
                                    >
                                        Mark Done
                                    </button>
                                )}
                                {task.projectownerid === user?.id && task.status === "DONE" && (
                                    <button 
                                        onClick={() => handleApprove(task.taskid)}
                                        style={{ padding: "4px 12px", cursor: "pointer", borderRadius: "4px", backgroundColor: "#6c757d", color: "white", border: "none" }}
                                    >
                                        Approve Task
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </section>

        <section>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h2 style={{ margin: 0 }}>My Project Groups</h2>
                <Link to="/groups" style={{ fontSize: "0.9em", color: "#007bff", textDecoration: "none" }}>Manage</Link>
            </div>

            {projects.length === 0 ? (
                <div style={{ padding: "30px", textAlign: "center", border: "1px dashed #ccc", borderRadius: "8px", color: "#666" }}>
                    You are not in any groups yet.
                </div>
            ) : (
                projects.map((project) => (
                <div key={project.projectid} style={{ border: "1px solid #eee", padding: "15px", marginBottom: "10px", borderRadius: "5px", backgroundColor: "white" }}>
                    <div style={{ marginBottom: "5px" }}>
                        <Link to={`/groups/${project.projectid}`} style={{ fontWeight: "bold", color: "#007bff", textDecoration: "none" }}>
                            {project.name}
                        </Link>
                    </div>
                    <div style={{ fontSize: "0.85em", color: "#666" }}>Role: {project.role}</div>
                    <div style={{ fontSize: "0.75em", color: "#999", marginTop: "5px" }}>Created: {new Date(project.createdat).toLocaleDateString()}</div>
                </div>
                ))
            )}
        </section>
      </div>
    </div>
  );
}
