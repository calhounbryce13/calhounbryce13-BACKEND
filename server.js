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
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: "calhounbryce13@gmail.com",
        pass: "T4113ngr10010137"
    }
})


app.post("/testing", (req, res) =>{
    //! this endpoint will process the user data by sending 
    //! an email to myself, not collecting user email atm.
    console.log(req.body);
    let testing = {message: JSON.stringify(req.body)};
    res.json(testing);

});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});