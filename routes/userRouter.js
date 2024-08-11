const express = require("express");
const router = express.Router();
const { validateSignup, signup } = require('../controllers/signup');
const login = require("../controllers/login");
const { protect } = require('../middleware/authToken');
const myProfile = require("../controllers/myProfile");
router.post('/signup', validateSignup, signup);
router.post('/login',login)
router.get('/profile',protect,myProfile)

module.exports = router;