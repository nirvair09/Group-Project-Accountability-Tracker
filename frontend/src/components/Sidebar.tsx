import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "My Tasks", path: "/tasks" },
  { label: "My Groups", path: "/groups" },
  { label: "Activity", path: "/activity" },
  { label: "Scores", path: "/scores" },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        borderRight: "1px solid #e5e7eb",
        padding: "16px",
        backgroundColor: "#fafafa",
      }}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          style={({ isActive }) => ({
            display: "block",
            padding: "8px 12px",
            marginBottom: "4px",
            textDecoration: "none",
            color: isActive ? "#111827" : "#4b5563",
            backgroundColor: isActive ? "#e5e7eb" : "transparent",
            borderRadius: "4px",
            fontWeight: isActive ? 500 : 400,
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
