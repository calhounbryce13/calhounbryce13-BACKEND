import express from 'express';
const app = express();
import cors from 'cors';
import { json } from 'express';


const PORT = process.env.PORT || 3000

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

app.use(express.json());


app.post("/testing", (req, res) =>{
    let testing = {message: JSON.stringify(req.body)};
    res.json(testing);

});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});