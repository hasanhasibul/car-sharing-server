const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect("mongodb+srv://carShare:carShare123123@cluster0.ezexp.mongodb.net/carShare?retryWrites=true&w=majority" , {useUnifiedTopology: true , useNewUrlParser: true})
    // mongoose.connect('mongodb+srv://sathya:sathyapr@cluster0.dkuc0.mongodb.net/sheycars-udemy' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose