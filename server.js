import express from 'express';
const app = express();
import cors from 'cors';
import { json } from 'express';
import nodemailer from 'nodemailer';


const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//!DEPLOYMENT NOTE: update the cors config. to allow access
//!                 from the website domain
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
//!                  prior to deployment, do not leave password in here
let postman = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "calhounbryce13@gmail.com",
        pass: "T4113ngr10010137"
    }
})


app.post("/testing", async(req, res) =>{
    //todo this endpoint will process the user data by sending 
    //todo an email to myself, not collecting user email atm.
    
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