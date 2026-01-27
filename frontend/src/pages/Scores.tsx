import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { getProjects } from "../api/projectsApi";
import { getTasksByProject } from "../api/tasksApi";

export default function Scores() {
  const { token, user } = useAuth();
  const [projectScores, setProjectScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    
    getProjects(token).then(async (projects) => {
        const scores = await Promise.all(projects.map(async (p: any) => {
            const tasks = await getTasksByProject(p.projectid, token);
            const myTasks = tasks.filter((t: any) => t.ownerid === user?.id);
            const approved = myTasks.filter((t: any) => t.status === 'APPROVED');
            const percentage = myTasks.length > 0 ? Math.round((approved.length / myTasks.length) * 100) : 0;
            return {
                id: p.projectid,
                name: p.name,
                total: myTasks.length,
                approved: approved.length,
                score: percentage
            };
        }));
        setProjectScores(scores);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [token, user]);

  if (loading) return <p style={{ padding: "20px" }}>Calculating scores...</p>;

  const averageScore = projectScores.length > 0 
    ? Math.round(projectScores.reduce((acc, curr) => acc + curr.score, 0) / projectScores.length)
    : 0;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>My Accountability Scores</h1>

      <div style={{ 
          padding: "30px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "15px", 
          textAlign: "center", 
          marginBottom: "30px",
          border: "1px solid #dee2e6"
      }}>
          <div style={{ fontSize: "1.2em", color: "#666", marginBottom: "5px" }}>Overall GPA</div>
          <div style={{ fontSize: "4em", fontWeight: "bold", color: "#007bff" }}>{averageScore}%</div>
          <p style={{ color: "#666" }}>Based on your performance in {projectScores.length} projects</p>
      </div>

      <h2>Project Detail</h2>
      {projectScores.length === 0 ? (
          <p>No project data available.</p>
      ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {projectScores.map(ps => (
                  <div key={ps.id} style={{ padding: "20px", border: "1px solid #eee", borderRadius: "10px", backgroundColor: "white" }}>
                      <h3 style={{ margin: "0 0 10px 0" }}>{ps.name}</h3>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                              <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>{ps.score}%</div>
                              <div style={{ fontSize: "0.8em", color: "#666" }}>{ps.approved} / {ps.total} tasks approved</div>
                          </div>
                          <div style={{ width: "60px", height: "60px", borderRadius: "50%", border: "5px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                <div style={{ 
                                    position: "absolute", 
                                    inset: "-5px", 
                                    borderRadius: "50%", 
                                    border: `5px solid ${ps.score >= 70 ? "#28a745" : ps.score >= 40 ? "#ffc107" : "#dc3545"}`,
                                    clipPath: `inset(0 0 0 0)` // Simple solid for now
                                }}></div>
                                <span style={{ fontSize: "0.8em", fontWeight: "bold" }}>{ps.score}</span>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
}
