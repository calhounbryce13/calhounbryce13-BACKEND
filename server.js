import express from 'express';
const app = express();
import cors from 'cors';

const PORT = 3000;

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


app.get("/testing", (req, res) =>{
    let testing = "lets see what happens";
    res.send(testing);

});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});