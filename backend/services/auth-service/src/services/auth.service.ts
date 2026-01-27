import bcrypt from "bcrypt";   
import { pool } from "../config/db";

export const registerUser=async(
    name:string,
    email:string,
    password:string,
)=>{
    const existing=await pool.query(
        `select id from users where email=$1`,
        [email]
    );
    if(existing.rows[0]){
        throw new Error("User already exists");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const result=await pool.query(
        `insert into users (name,email,password) values ($1,$2,$3)`,
        [name,email,hashedPassword]
    );
    return result.rows[0];
}