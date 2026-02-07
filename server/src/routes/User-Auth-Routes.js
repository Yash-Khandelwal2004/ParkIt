const express=require("express")

const {
    registerUser,
    loginUser,
    changePassword,
    deleteUser,
} =require("../controllers/User-Auth-Controller")

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)
router.put("/changepassword/:id",changePassword)
router.delete("/delete/:id",deleteUser)

module.exports=router;