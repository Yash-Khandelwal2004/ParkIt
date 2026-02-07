const express=require('express')

const {
    registerParking,
    deleteParking,
    getAllParkings,
    getSingleParkingById,

}=require("../controllers/Parking-Controller")



const router=express.Router();

router.post("/register",registerParking);
router.delete("/delete/:id",deleteParking)
router.get("/allparkings",getAllParkings)
router.get("/singleparking/:id",getSingleParkingById)

module.exports=router;