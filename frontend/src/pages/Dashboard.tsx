import { useAuth } from "../auth/AuthContext";
import { useState, useEffect } from "react";
import { getProjects } from "../api/projectsApi";

export default function Dashboard() {
  const { token, user } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    
    getProjects(token)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      
      <section>
        <h2>Welcome, {user?.name}!</h2>
        <p>Email: {user?.email}</p>
      </section>

      <section>
        <h2>Your Projects</h2>
        {projects.length === 0 && <p>No projects yet</p>}
        {projects.map((project) => (
          <div key={project.projectid} style={{ marginBottom: "10px" }}>
            <strong>{project.name}</strong>
            <div>Created: {new Date(project.createdat).toLocaleDateString()}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
