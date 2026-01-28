import bcrypt from "bcrypt";   
import { pool } from "@gpa/shared";
import { v4 as uuid } from "uuid";

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
    
    const userId = uuid();
    const hashedPassword=await bcrypt.hash(password,10);
    
    const result=await pool.query(
        `insert into users (id, name, email, password) values ($1, $2, $3, $4) RETURNING id, name, email`,
        [userId, name, email, hashedPassword]
    );
    return result.rows[0];
}


export const loginUser=async(email:string,password:string)=>{
    const result=await pool.query(
        `select * from users where email=$1`,
        [email]

    );

    if(!result.rowCount){
        throw new Error("User not found");
    }
    const user=result.rows[0];
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        throw new Error("Invalid password");
    }
    return {
        id:user.id,
        name:user.name,
        email:user.email
    };
};