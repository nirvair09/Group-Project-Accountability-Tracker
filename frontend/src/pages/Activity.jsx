import ActivityFeed from "../components/ActivityFeed.jsx";

export default function Activity() {
  return (
    <div className="page-wrapper fade-in">
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Activity</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem" }}>
          View the complete history of actions across all your projects
        </p>
      </div>

      <ActivityFeed />
    </div>
  );
}
