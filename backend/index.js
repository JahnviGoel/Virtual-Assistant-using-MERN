import express from 'express'
import dotenv from "dotenv"
import connectDB from './config/db.js';
import connectDb from './config/db.js';
import authRouter from './routes/auth.router.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
const port=process.env.PORT || 5000;

// app.get("/",(req,res)=>
// {
//   res.send("hello");
// })

//create a middleware
//to convert data into json
app.use(express.json());
//for cookie
app.use(cookieParser())
app.use("/api/auth",authRouter)


app.listen(port,()=>
{
  connectDb();
  console.log("server started");

})