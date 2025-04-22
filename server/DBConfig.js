import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

const uri=process.env.DB_CONNECTION_STRING
const DB_connection=async()=>{
   await mongoose.connect(uri,
   
    )
}

export default DB_connection;