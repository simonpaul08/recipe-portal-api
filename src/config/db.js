import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        const connect = await mongoose.connect(mongoURI)
        console.log(connect.connection.host)
    }catch(e){
        console.log(e)
    }

}

export default connectToMongo

