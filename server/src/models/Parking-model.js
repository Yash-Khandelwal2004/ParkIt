const mongoose=require("mongoose")

const ParkingSchema=new mongoose.Schema({
    address:{
        type:String,
        required:[true,'Address is required'],
        trim:true,
        unique:true,
    },
    owner:{
        type:String,
        required:true,
        trim:true,
    },
    fee:{
        type:Number,
        required:true,
        trim:true,
    },
    count:{
        type:Number,
    },
    type:{
        type:String,
        required:true,
        enum: ["two wheeler", "four wheeler"],
        default:"four wheeler",
    },
    renter:{
        type:mongoose.Schema.Types.ObjectId,
        res:"User",
        require:true,
    },


},
  { timestamps: true })

module.exports=mongoose.model("Parking",ParkingSchema)
