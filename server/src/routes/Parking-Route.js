const express=require('express')

const {
    registerParking,
    deleteParking,
    getAllParkings,
    getSingleParkingById,
    getMyOwnedParkings,
    getMyBookedParkings

}=require("../controllers/Parking-Controller");
const authMiddleware = require('../middleware/Auth-middleware');



const router=express.Router();

router.post("/register",authMiddleware,registerParking);
router.delete("/delete/:id",deleteParking)
router.get("/allparkings",getAllParkings)
router.get("/singleparking/:id",getSingleParkingById)
router.get("/my-owned", authMiddleware, getMyOwnedParkings);
router.get("/my-booked", authMiddleware, getMyBookedParkings);


module.exports=router;