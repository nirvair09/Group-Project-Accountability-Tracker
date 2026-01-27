import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
export default function Login(){
    const {login}=useAuth();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    async function handleLogin(){
        const res=await fetch("http://localhost:4001/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        });

        const data=await res.json();
        login(data.user,data.token);

    }


    return(
        <div>
            <h1>Login Form</h1>
            <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
        </div>

    )
    
}