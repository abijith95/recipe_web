import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usermodel } from "../pack1/User.js";

const router = express.Router();
router.post("/register",async (req,res) => {
    const {username,password} = req.body;
    const user = await usermodel.findOne({username:username});
     if(user){
        return res.json({ message : "User already exists"});
     }
     const hashPassword = await bcrypt.hash(password, 10);
     const newuser = new usermodel({ username,password:hashPassword});
     await newuser.save();
    res.json({message: "Registration successfull"});
});
router.post("/login",async(req,res)=>{
    const { username ,password} = req.body;
    const user = await usermodel.findOne({username});
    if(!user){
        return res.json({message:"User don't exist"});
    }

    const passvalid = await bcrypt.compare(password,user.password);
if (!passvalid){
    return res.json({message:"Username or Password is incorrect"});
}

const token = jwt.sign({id:user._id},"secret");
res.json({token,userid:user._id})
}); 
export {router as userRouter };