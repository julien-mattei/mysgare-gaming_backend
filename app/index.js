import 'dotenv/config';
import express from 'express';

export const app = express ();

const PORT = process.env.PORT || 3000
export const server = app.listen(PORT,  () => {
    console.log(`app is listening at http://localhost:${PORT}`)
})