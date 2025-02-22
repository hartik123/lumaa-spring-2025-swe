import mongoose from "mongoose";

mongoose.set('strictQuery', true);
const connectDB = (DATABASE_URL, OPTIONS) => {
    return mongoose.connect("mongodb+srv://hartiktaskmanager:Suhagiya%40123@cluster0.ewf0cut.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
        console.log("Database Connected successfully")
    })
    .catch((err)=>{
        console.log(err)
    })

}

export default connectDB