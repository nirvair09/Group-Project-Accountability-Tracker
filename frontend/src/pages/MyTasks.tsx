import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { getMyTasks, updateTaskStatus } from "../api/tasksApi";
import ConfirmModal from "../components/ConfirmModal";

export default function MyTasks() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: "primary" | "danger" | "success";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "primary",
  });

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getMyTasks(token)
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const handleStatusChange = async (taskId: string, status: "IN_PROGRESS" | "DONE" | "CANCELLED") => {
    if (!token) return;
    try {
      await updateTaskStatus(taskId, status, token);
      getMyTasks(token).then(setTasks);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const askConfirm = (title: string, message: string, onConfirm: () => void, type: "primary" | "danger" | "success" = "primary") => {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      onConfirm: async () => {
        await onConfirm();
        setConfirmConfig(prev => ({ ...prev, isOpen: false }));
      },
      type,
    });
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading your tasks...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>My Tasks</h1>
      <p style={{ color: "#666" }}>Manage all tasks assigned to you across all projects.</p>
      
      {tasks.length === 0 ? (
        <div style={{ padding: "50px", textAlign: "center", border: "1px dashed #ccc", borderRadius: "10px", marginTop: "20px", color: "#888" }}>
            <div style={{ fontSize: "3em", marginBottom: "10px" }}>📋</div>
            <div>No tasks assigned to you yet. You're all caught up!</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px", marginTop: "20px" }}>
          {tasks.map((task) => {
             const isOverdue =
             task.deadline &&
             new Date(task.deadline) < new Date() &&
             task.status !== "APPROVED";

            return (
              <div key={task.taskid} style={{ 
                  padding: "20px", 
                  border: "1px solid #dee2e6", 
                  borderRadius: "8px", 
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
              }}>
                <div>
                   <div style={{ fontSize: "0.8em", color: "#007bff", fontWeight: "bold" }}>{task.projectname}</div>
                   <div style={{ fontSize: "1.2em", fontWeight: "bold", margin: "5px 0" }}>{task.title}</div>
                   <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                        <span style={{ 
                            fontSize: "0.8em", 
                            padding: "2px 8px", 
                            backgroundColor: task.status === 'APPROVED' ? '#d4edda' : '#fff3cd',
                            borderRadius: "10px"
                        }}>
                            {task.status}
                        </span>
                        {task.deadline && (
                            <span style={{ fontSize: "0.85em", color: isOverdue ? "red" : "#666" }}>
                                Due: {new Date(task.deadline).toLocaleString()}
                                {isOverdue && <strong> (OVERDUE)</strong>}
                            </span>
                        )}
                   </div>
                </div>
                <div>
                    {task.status === "CREATED" && (
                        <button 
                            onClick={() => askConfirm(
                                "Start Task", 
                                "Are you sure you want to start this task?", 
                                () => handleStatusChange(task.taskid, "IN_PROGRESS"),
                                "primary"
                            )}
                            style={{ padding: "8px 20px", cursor: "pointer", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none" }}
                        >
                            Start Task
                        </button>
                    )}
                    {task.status === "IN_PROGRESS" && (
                        <button 
                            onClick={() => askConfirm(
                                "Mark Task Done", 
                                "Are you sure you have completed this task?", 
                                () => handleStatusChange(task.taskid, "DONE"),
                                "success"
                            )}
                            style={{ padding: "8px 20px", cursor: "pointer", borderRadius: "5px", backgroundColor: "#28a745", color: "white", border: "none" }}
                        >
                            Complete Task
                        </button>
                    )}
                    {task.status === "APPROVED" && (
                        <span style={{ color: "#28a745", fontWeight: "bold" }}>✅ Approved</span>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
        type={confirmConfig.type}
      />
    </div>
  );
}
