const User = require("../models/user");
const express = require("express");
const router = express.Router(); 
const Usercontroller = require("../controllers/user");

router.post("/signup",Usercontroller.signup);

router.post("/login",Usercontroller.login);



module.exports = router;
