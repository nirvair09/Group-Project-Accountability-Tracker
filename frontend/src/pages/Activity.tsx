import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { getAllActivity } from "../api/tasksApi";

export default function Activity() {
  const { token } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    getAllActivity(token)
      .then(setActivities)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p style={{ padding: "20px" }}>Loading activity...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Recent Activity</h1>
      
      {activities.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", border: "1px dashed #ccc", borderRadius: "10px", color: "#666" }}>
            <p>This feature will be available soon where activities of all group members will be visible.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {activities.map((event) => (
            <div key={event.event_id} style={{ 
                padding: "15px", 
                border: "1px solid #eee", 
                borderRadius: "8px", 
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "0.8em", color: "#007bff", fontWeight: "bold" }}>{event.projectname}</span>
                  <span style={{ fontSize: "0.75em", color: "#999" }}>{new Date(event.timestamp).toLocaleString()}</span>
              </div>
              <div style={{ fontSize: "0.95em" }}>
                <strong>{event.username || "System"}</strong> 
                {event.type === 'TASK_CREATED' && ` created task: ${event.metadata?.title}`}
                {event.type === 'TASK_STATUS_CHANGED' && ` changed status to ${event.metadata?.to}`}
                {event.type === 'TASK_APPROVED' && ` approved a task.`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
