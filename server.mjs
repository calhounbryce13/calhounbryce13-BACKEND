/*
Description: Server-side data processing script.
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
    methods: ['GET', 'POST', 'PUT']
}));

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


app.get("/get-traffic", async(req, res) => {
    try{
        const traffic = await messages.retrieve_log();
        if(traffic){
            res.status(200).json(traffic);
            return;
        }
    }catch(error){
        console.log(error);
    }
    res.status(500).json("error: issue getting the traffic data");
    return;
});

app.put("/traffic-log", async(req, res) => {
    const { programName } = req.body;
    console.log(programName);
    if(programName){
        const result = await messages.update_log(programName);
        if(!result){
            res.sendStatus(200);
        }
        else if(result){
            if(result == 1){
                res.status(500).json("error: issue saving");
            }else{
                res.status(500).json("error: issue finding the document");
            }
        }
        return;
    }
    res.status(400).json("error: missing the name of the source program");
    return;
});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});