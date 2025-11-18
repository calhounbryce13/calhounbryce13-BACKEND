/*
Description: Server-side data processing script for the frontend of my portfolio page
Author: Bryce Calhoun
 */
import express from 'express';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(cors({
    origin: "https://calhounbryce13.github.io",
    methods: ['GET, POST']
}))


app.post("/mailer", async(req, res) =>{
    



});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});