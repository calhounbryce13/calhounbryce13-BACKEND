import express from 'express';
const app = express();

const PORT = 3000;


//todo: i need route handlers 
//? for what ?
//* user needs to be able to submit email and message


app.GET("/testing", (req, res) =>{
    window.alert("endpoint defined!")

});

app.listen(PORT, () =>{
    console.log(`\nserver listening on port:${PORT}`)
});