const mongoose=require("mongoose")

const connectToDb=async()=>{
    try {
        await mongoose.connect("");
        console.log("mongodb connected successfully")
    } catch (e) {
        console.e("Connection with mongodb failed",e);
        process.exit(1);
    }
}

module.exports=connectToDb;