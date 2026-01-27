import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import { login as loginApi } from "../api/authApi";
import { Link } from "react-router-dom";

export default function Login(){
    const {login}=useAuth();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function handleLogin(){
        try {
            const data = await loginApi(email, password);
            login(data.user, data.token);
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed: " + (error instanceof Error ? error.message : String(error)));
        }
    }


    return(
        <div>
            <h1>Login Form</h1>
            <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>

    )
    
}