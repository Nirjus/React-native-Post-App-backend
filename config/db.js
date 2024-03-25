import mongoose from "mongoose";
import { mongoUri } from "../secret/secret.js";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri).then(() => {
            console.log(`Database is connected at ${mongoose.connection.host}`.bgGreen)
        }).catch((error) => {
            console.log(`MOngo db connection error: ${error}`)
        })
    } catch (error) {
          console.log(error)
    }
}

export default connectDB;