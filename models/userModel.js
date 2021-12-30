const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     username : {type:String , required: true},
     password : {type:String , required: true},
     email : {type:String , required: true},
     phone : {type:String , required: true},
     gender : {type:String , required: true},
     nid : {type:String , required: true},
     pAddress : {type:String , required: true},
     currentAddress : {type:String , required: true},
     upload : {type:String , required: true},
})

const userModel = mongoose.model('users' , userSchema)

module.exports = userModel