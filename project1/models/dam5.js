const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diwutianschema = new Schema({
    yx_id:{
        type:String,
        required:true
    },
    first_dam:{
        type:String
    },
    second_dam:{
        type:String
    },
    third_dam:{
        type:String
    },
    remark:{
        type:String
    }   
})

module.exports = dam5 = mongoose.model("dam5",diwutianschema);