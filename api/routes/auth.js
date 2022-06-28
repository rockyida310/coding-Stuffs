const router = require("express").Router();
const {registerUser,loginUser, verifyEmail} = require('../controller/auth');

//REGISTER
router.post("/register", registerUser);
router.post("/verify", verifyEmail);

//LOGIN
router.post("/login",loginUser);

module.exports = router;
