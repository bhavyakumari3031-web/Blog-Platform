import 'dotenv/config';import express from 'express';import cors from 'cors';import path from 'path';import {fileURLToPath} from 'url';import connectDB from './config/db.js';import authRoutes from './routes/auth.js';import postRoutes from './routes/posts.js';
const app=express();const __filename=fileURLToPath(import.meta.url);const __dirname=path.dirname(__filename);
app.use(cors());app.use(express.json());app.use('/uploads',express.static(path.join(__dirname,'uploads')));app.get('/',(req,res)=>res.send('Blog Platform API is running'));app.use('/api/auth',authRoutes);app.use('/api/posts',postRoutes);
const PORT=process.env.PORT||5000;connectDB().then(()=>app.listen(PORT,()=>console.log(`Server running on ${PORT}`))).catch(e=>{console.error(e);process.exit(1);});
