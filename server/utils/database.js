import mongoose from "mongoose";

const connection=mongoose.createConnection();

connection.on('connected',()=>console.log("conneted to MongoDB"));
connection.on('error',(e)=>console.log(`Something went wrong connecting to MongoDB: ${e.message}`));
connection.on('disconnected',()=>console.log("Disconnected from MongoDB"));

export default connection;
