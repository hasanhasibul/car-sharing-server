const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51GvUxmHspu8WL2jGVosHTeAXnEgiKUwekzjvunifymAx68lkcwvlWiyfz74t3MHpfmQrNuW7brvK6ezg01ioHMf400TYDhiV21"
);
router.post("/bookcar", async (req, res) => {
  const { token } = req.body;
  console.log('token is ',req.body);
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "BDT",
        customer: customer.id,
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4(),
        
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      console.log("newbooking",newbooking);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      
      await car.save();
      res.send("Your booking is successfull");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find().populate('car')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});

router.get("/getBooking/:id", async(req, res) => {
const carId = req.params.id;
  try {

      const bookings = await Booking.find({car:carId}).populate('car')
      res.send(bookings)
      
  } catch (error) {
      return res.status(400).json(error);
  }

});

module.exports = router;
