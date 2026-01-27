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
            // Calculate scores for ALL members in this project (per project wise)
            const membersMap: Record<string, any> = {};
            
            // First, get all members for this project to ensure everyone is listed even with 0 tasks
            // For now, we'll derive members from tasks and current user
            const membersInProject = Array.from(new Set(tasks.map((t: any) => t.ownerid)));
            if (!membersInProject.includes(user?.id)) membersInProject.push(user?.id);

            const projectMembersScores = membersInProject.map(memberId => {
                const memberTasks = tasks.filter((t: any) => t.ownerid === memberId);
                const approved = memberTasks.filter((t: any) => t.status === 'APPROVED');
                const score = memberTasks.length > 0 ? Math.round((approved.length / memberTasks.length) * 100) : 0;
                return {
                    memberId,
                    total: memberTasks.length,
                    approved: approved.length,
                    score
                };
            });

            return {
                id: p.projectid,
                name: p.name,
                members: projectMembersScores
            };
        }));
        setProjectScores(scores);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [token, user]);

  if (loading) return <p style={{ padding: "20px" }}>Calculating scores...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Project Accountability Scores</h1>
      <p style={{ color: "#666" }}>Performance breakdown for all members across your projects.</p>

      {projectScores.length === 0 ? (
          <div style={{ padding: "50px", textAlign: "center", border: "1px dashed #ccc", borderRadius: "10px", color: "#666" }}>
              You are not in any projects yet.
          </div>
      ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "20px" }}>
              {projectScores.map(project => (
                  <div key={project.id} style={{ padding: "25px", border: "1px solid #dee2e6", borderRadius: "12px", backgroundColor: "white", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                      <h2 style={{ margin: "0 0 20px 0", color: "#007bff", borderBottom: "2px solid #f8f9fa", paddingBottom: "10px" }}>{project.name}</h2>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
                          {project.members.map((m: any) => (
                              <div key={m.memberId} style={{ padding: "15px", border: "1px solid #f0f0f0", borderRadius: "8px", backgroundColor: "#fdfdfd" }}>
                                  <div style={{ fontWeight: "bold", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
                                      <span>{m.memberId === user?.id ? "Me" : `User (${m.memberId.slice(0,4)})`}</span>
                                      <span style={{ color: m.score >= 70 ? "#28a745" : m.score >= 40 ? "#ffc107" : "#dc3545" }}>{m.score}%</span>
                                  </div>
                                  <div style={{ height: "6px", backgroundColor: "#eee", borderRadius: "3px", overflow: "hidden", marginBottom: "8px" }}>
                                      <div style={{ width: `${m.score}%`, height: "100%", backgroundColor: m.score >= 70 ? "#28a745" : m.score >= 40 ? "#ffc107" : "#dc3545" }}></div>
                                  </div>
                                  <div style={{ fontSize: "0.8em", color: "#888" }}>
                                      {m.approved} of {m.total} tasks approved
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              ))}
          </div>
      )}
    </div>
  );
}
