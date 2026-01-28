import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import ConfirmModal from "./ConfirmModal";

export default function TopNav() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        height: "56px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Left */}
      <div style={{ fontWeight: 600, fontSize: "1.2rem", color: "#4f46e5" }}>GPA Tracker</div>

      {/* Center */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <h1
          style={{
            padding: "6px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "0.9rem",
            outline: "none",
            backgroundColor: "#f9fafb"
          }}
        >
          Group Project Accountability Tracker
        </h1>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>{user?.name}</div>
          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{user?.email}</div>
        </div> */}

        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            backgroundColor: "#4f46e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(79, 70, 229, 0.2)"
          }}
        >
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          style={{
            padding: "6px 12px",
            backgroundColor: "#fee2e2",
            color: "#ef4444",
            border: "none",
            borderRadius: "6px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#fecaca")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
        >
          Logout
        </button>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Logout Confirmation"
        message="Are you sure you want to log out?"
        confirmText="Yes, Logout"
        type="danger"
        onConfirm={logout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </header>
  );
}
