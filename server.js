/*
Description: Server-side data processing script for the frontend of my portfolio page
Author: Bryce Calhoun
 */
import nodemailer from 'nodemailer';
import express from 'express';
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!DEPLOYMENT NOTE: update the cors config. to allow access
//!                 from the actual website domain
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin === "null") {  // Allow requests from null origins
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ['GET, POST']
}))

//! DEPLOYMENT NOTE: use environment variables stored on heroku dashboard
//!                  prior to deployment, do not leave app password in here
let postman = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "calhounbryce13@gmail.com",
        pass: "abjz dhzm bijv wmky"
    }
})

app.post("/mailer", async(req, res) =>{
    
    const name = req.body.name;
    const message = req.body.message;

    try{
        let postMail = await postman.sendMail({
            from: 'calhounbryce13@gmail.com',
            to: 'calhounbryce13@gmail.com',
            subject: 'A user sent you a new message',
            text: `${name} says ${message}`
        })
        res.status(200).send(JSON.stringify({success: true}));
    }catch(error){
        console.log(error, "couldn't send email");
        res.status(500).send(JSON.stringify({success: false}))
    }


});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});