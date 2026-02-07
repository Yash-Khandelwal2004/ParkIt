const mongoose=require("mongoose")

const connectToDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully")
    } catch (e) {
        console.e("Connection with mongodb failed",e);
        process.exit(1);
    }
}

module.exports=connectToDb;