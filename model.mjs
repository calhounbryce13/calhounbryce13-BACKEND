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


const trafficLogSchema = new mongoose.Schema({
    projectory: {type: Number, required: true},
    minimaxSolver: {type: Number, required: true},
    quiznest: {type: Number, required: true},
});


const Log = mongoose.model('log', trafficLogSchema, 'traffic-log');

const Mssg = mongoose.model('new-message', messageSchema, 'messages');


const save_new_message = function(message){
    const newMssg = Mssg({message:message});
    return newMssg.save();
}

const get_all_messages = async() => {
    let messages = Mssg.find({}, {'message': 1, '_id': 0});
    return messages;
}

const update_log = async(programName) => {
    try{
        const log = await Log.find({});
        if(log[0][programName] != undefined){
            log[0][programName]++;
            try{
                await log[0].save();
                return 0; // success
            }catch{
                return 1; // error saving
            }
        }
        throw "invalid name";
    }catch{
        return 2; // error finding
    }
};


const retrieve_log = async() => {
    try{
        const log = await Log.find({});
        return log[0];
    }catch(error){
        console.log(error);
        return false;
    }
};


const db = mongoose.connection;

db.once("open", ()=>{
    console.log("\nconnected to mongodb database!");
});


export default { save_new_message, get_all_messages, update_log, retrieve_log }