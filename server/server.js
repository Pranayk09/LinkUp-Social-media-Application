import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDb from './configs/db.js';
import { serve } from "inngest/express";
import { inngest, functions } from './inngest/index.js';
import { clerkMiddleware } from '@clerk/express'
import userRouter from './routes/userRoutes.js';

const app = express();

await connectDb();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());



app.get('/', (req,res)=> { res.send('Server is Live')});
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use('/api/user', userRouter);

app.listen(PORT, ()=> {console.log("Server is Listening on port", PORT)})