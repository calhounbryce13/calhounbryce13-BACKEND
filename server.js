import express from 'express';
const app = express();
import cors from 'cors';

const PORT = 3000;

app.use(cors({
    origin : 'https://calhounbryce13.github.io/',
    methods: 'GET, POST'
}))


app.GET("/testing", (req, res) =>{
    window.alert("endpoint defined!")

});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});