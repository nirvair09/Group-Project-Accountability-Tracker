import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { login as loginApi } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      const data = await loginApi(email, password);
      login(data.user, data.token);
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: "rgba(255, 255, 255, 0.95)",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        textAlign: "center"
      }}>
        <div style={{ marginBottom: "30px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🎯</div>
            <h1 style={{ margin: 0, color: "#333", fontSize: "1.8rem" }}>Welcome Back</h1>
            <p style={{ color: "#666", marginTop: "5px" }}>Login to your accountability tracker</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Email Address</label>
            <input 
              type="email"
              placeholder="Enter email" 
              required
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "1rem",
                transition: "border-color 0.2s",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "30px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              required
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "1rem",
                transition: "border-color 0.2s",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#667eea",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 6px rgba(102, 126, 234, 0.4)",
              transition: "transform 0.2s, background-color 0.2s"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "25px", color: "#666", fontSize: "0.95rem" }}>
          Don't have an account? <Link to="/register" style={{ color: "#667eea", fontWeight: "bold", textDecoration: "none" }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}