const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        maxLenght:[16,'User Name cannot be more than 16 characters'],
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,

    },
    password: {
      type: String,
      required: true,
    },
     createdAT:{
        type:Date,
        default:Date.now(),
    },
},  { timestamps: true })

module.exports= mongoose.model("User", UserSchema);