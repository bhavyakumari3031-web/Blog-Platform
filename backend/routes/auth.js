import express from 'express';import bcrypt from 'bcryptjs';import jwt from 'jsonwebtoken';import User from '../models/User.js';
const router=express.Router();
const tokenFor=u=>jwt.sign({id:u._id.toString()},process.env.JWT_SECRET,{expiresIn:'7d'});
router.post('/register',async(req,res)=>{try{const {name,email,password}=req.body;if(!name||!email||!password)return res.status(400).json({message:'All fields are required'});if(await User.findOne({email}))return res.status(400).json({message:'Email already registered'});const u=await User.create({name,email,password:await bcrypt.hash(password,10)});res.status(201).json({token:tokenFor(u),user:{id:u._id,name:u.name,email:u.email}});}catch(e){res.status(500).json({message:'Registration failed'});}});
router.post('/login',async(req,res)=>{try{const {email,password}=req.body;const u=await User.findOne({email});if(!u||!(await bcrypt.compare(password,u.password)))return res.status(401).json({message:'Invalid email or password'});res.json({token:tokenFor(u),user:{id:u._id,name:u.name,email:u.email}});}catch{res.status(500).json({message:'Login failed'});}});
export default router;
