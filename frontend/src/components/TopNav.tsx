export default function TopNav() {
  return (
    <header
      style={{
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
      <div style={{ fontWeight: 600 }}>GPA Tracker</div>

      {/* Center */}
      <select
        style={{
          padding: "6px 8px",
          border: "1px solid #d1d5db",
          borderRadius: "4px",
        }}
      >
        <option>Group Project Accountability Tracker</option>
      </select>

      {/* Right */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#9ca3af",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        R
      </div>
    </header>
  );
}
