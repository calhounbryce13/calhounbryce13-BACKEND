/*
Description: Server-side data processing script for the frontend of my portfolio page
Author: Bryce Calhoun
 */
import express from 'express';
import cors from 'cors';
import messages from './model.mjs';
const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(cors({
    origin: "https://calhounbryce13.github.io",
    methods: ['GET', 'POST']
}));



app.post('/get-user-data', (req, res) => {
    if(req.body["application"]){
        const message = `user with IP: ${req.ip} has just accessed ${req.body["application"]}`;
        try{
            messages.save_new_message(message);
            res.status(200).json("success");
        }catch(error){
            res.status(500).json({"error": "could not save the message"})
        }
        return;
    }
    res.status(400).json({"error": "app name not present"});
    return;
});

app.get('/messages', async(req, res) => {

    try{
        const data = await messages.get_all_messages();
        res.status(200).json(data);
    }catch(error){
        console.log(error);
        res.status(500).json({"error":"issue getting the messages"});
    }
    return
});


app.post("/mailer", async(req, res) =>{
    if(req.body){
        if(req.body.message){
            try{
                messages.save_new_message(req.body.message);
                res.status(200).json("success");
            }catch(error){
                console.log(error);
                res.status(500).json({"error":"issue saving that message"});
            }
            return;
        }
        res.status(400).json({"error":"invalid request body"});
        return;
    }
    res.status(400).json({"error":"missing request body"});
    return;
    
});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});