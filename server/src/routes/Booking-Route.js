const express=require('express');
const { createBooking, deleteBooking ,getMyBookings} = require('../controllers/Booking-Controller');
const authMiddleware = require('../middleware/Auth-middleware');



const router=express.Router();

router.post("/book-parking/:parkingId",authMiddleware,createBooking)
router.delete("/cancel-parking/:bookingId",authMiddleware,deleteBooking)
router.get("/my-bookings", authMiddleware, getMyBookings);
module.exports=router;