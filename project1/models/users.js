const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    identity:{
        type:String,
        required:true
    },
    gonghui:{
        type:String
    },
    gkp:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = user = mongoose.model("users",userschema);