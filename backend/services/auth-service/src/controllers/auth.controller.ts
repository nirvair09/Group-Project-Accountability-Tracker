import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { signToken } from "../utils/jwt";


export const registerController=async(req:Request,res:Response)=>{
    try {
        const {name,email,password}=req.body;

        if(!name||!email||!password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user=await registerUser(name,email,password);
        const token=signToken({userId:user.id,email:user.email});
        res.status(201).json({user,token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
};

