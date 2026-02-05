const express=require("express")

const {
    registerUser,
    loginUser,
} =require("../controllers/User-Auth-Controller")

const router=express.Router();

router.post("/register",registerUser);
router.post("login",loginUser)

module.exports=router;