const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({


      car : {type : mongoose.Schema.Types.ObjectID , ref:'cars'},
      user : {type : mongoose.Schema.Types.ObjectID , ref:'users'},
      
      from : {type : String} ,
      to : {type : String},
      totalHours : {type : String},
      totalAmount : {type : String},
      transactionId : {type : String},
      travelDate : {type : String},
      travelTime : {type : String},
      bookingLastTime : {type : String},
      carNumber : {type : String},
      contactNumber:{type : String},
      capacity: {type : String},
      bookingCount: {type : String},

},
  {timestamps : true}
)

const bookingModel = mongoose.model('bookings' , bookingSchema)

module.exports = bookingModel