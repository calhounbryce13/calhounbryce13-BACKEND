'use strict';
import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true }
);


const messageSchema = new mongoose.Schema({
    message: {type: String, required: true}
});

const Mssg = mongoose.model('new-message', messageSchema, 'messages');

const db = mongoose.connection;


const save_new_message = function(message){
    const newMssg = Mssg({message:message});
    return newMssg.save();
}

const get_all_messages = async() => {
    let messages = Mssg.find({}, {'message': 1, '_id': 0});
    return messages;
}

db.once("open", ()=>{
    console.log("\nconnected to mongodb database!");
});


export default { save_new_message, get_all_messages }
