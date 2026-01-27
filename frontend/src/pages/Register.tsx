import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { register as registerApi } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Register() {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegister() {
        try {
            const data = await registerApi(name, email, password);
            login(data.user, data.token);
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed: " + (error instanceof Error ? error.message : String(error)));
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <input 
                placeholder="Name" 
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input 
                placeholder="Email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}
