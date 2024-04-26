import mongoose from "mongoose";

let isConnected = false;

async function dbConnect(){
    if(isConnected == true){
        console.log("Db connected already")
    }
    try {
        const db = await mongoose.connect(`${process.env.ConnectionString}`,{
            dbName:"Todoapp"
        });
        isConnected = db.connections[0].readyState;
    } catch (error) {
        throw error;
    }
}

export default dbConnect;