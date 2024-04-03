const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const foodPickupSchema = new mongoose.Schema({
    _id:{type:String,default:uuidv4},
    time:{type:String,required:true},
    phone:{type:String,required:true},
    lattitude:{type:String,required:true},
    longitude:{type:String,required:true},
    meal:{type:String,required:true}
})


const foodPickupModel = mongoose.model('foodPickups',foodPickupSchema)

module.exports={foodPickupModel}