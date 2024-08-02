const express = require("express");
const router = express.Router();
const { validateSignup, signup } = require('../controllers/signup');
const login = require("../controllers/login");

router.post('/signup', validateSignup, signup);
router.post('/login',login)

module.exports = router;