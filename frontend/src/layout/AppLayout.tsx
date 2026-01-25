import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <header
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: "20px",
        }}
      >
        <strong>GPAT</strong>

        <nav style={{ display: "flex", gap: "12px" }}>
          <Link to="/">Dashboard</Link>
          <Link to="/faculty">Faculty View</Link>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
