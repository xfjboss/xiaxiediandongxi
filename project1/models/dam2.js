const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diertianschema = new Schema({
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

module.exports = dam2 = mongoose.model("dam2",diertianschema);