import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { register as registerApi } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Register() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) return;

    setLoading(true);
    try {
      const data = await registerApi(name, email, password);
      login(data.user, data.token);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed: " + (error instanceof Error ? error.message : String(error)));
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
      background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
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
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🚀</div>
            <h1 style={{ margin: 0, color: "#333", fontSize: "1.8rem" }}>Create Account</h1>
            <p style={{ color: "#666", marginTop: "5px" }}>Join the GPA tracker today</p>
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Full Name</label>
            <input 
              type="text"
              placeholder="John Doe" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Email Address</label>
            <input 
              type="email"
              placeholder="name@example.com" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "1rem",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ marginBottom: "30px", textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "600", fontSize: "0.9rem" }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "1rem",
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
              backgroundColor: "#764ba2",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 6px rgba(118, 75, 162, 0.4)",
              transition: "transform 0.2s"
            }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "25px", color: "#666", fontSize: "0.95rem" }}>
          Already have an account? <Link to="/login" style={{ color: "#764ba2", fontWeight: "bold", textDecoration: "none" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
