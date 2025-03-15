import express from 'express';
const app = express();
import cors from 'cors';

const PORT = 3000;

app.use(cors({
    origin : 'https://calhounbryce13.github.io/',
    methods: ['GET, POST']
}))


app.get("/testing", (req, res) =>{
    let testing = "lets see what happens";
    res.send(testing);

});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});