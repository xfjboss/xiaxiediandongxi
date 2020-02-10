const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liwuschema = new Schema({
    suoshuren_id:{
        type:String,
        required:true
    },
    suoshuren:{
        type:String,
        required:true
    },
    wupin_name:{
        type:String,
        required:true
    },
    wupin_dengji:{
        type:String
    },
    chouqu_time:{
        type:Date,
        default:Date.now
    }   
})

module.exports = Liwu = mongoose.model("liwu",liwuschema);