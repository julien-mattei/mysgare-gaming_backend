import 'dotenv/config';
import express from 'express';
import cors from "cors";
import { router } from './router.js';

export const app = express ();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(router)

const PORT = process.env.PORT || 3000
export const server = app.listen(PORT,  () => {
    console.log(`app is listening at http://localhost:${PORT}`)
})