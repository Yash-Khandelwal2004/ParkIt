const express=require('express');
const { createBooking, deleteBooking } = require('../controllers/Booking-Controller');
const authMiddleware = require('../middleware/Auth-middleware');



const router=express.Router();

router.post("/book-parking/:parkingId",authMiddleware,createBooking)
router.delete("/cancel-parking/:bookingId",authMiddleware,deleteBooking)

module.exports=router;