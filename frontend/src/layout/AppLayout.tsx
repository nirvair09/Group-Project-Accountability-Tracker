import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <TopNav />

      <div style={{ flex: 1, display: "flex" }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f9fafb",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
