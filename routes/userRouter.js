const express = require("express");
const router = express.Router();
const { validateSignup, signup } = require('../controllers/signup');
const login = require("../controllers/login");
const { protect } = require('../middleware/authToken');
const myProfile = require("../controllers/myProfile");
const addToWishlist = require("../controllers/addWishlist");
const removeFromWishlist = require("../controllers/removeFromWishlist");
const getWishlist = require("../controllers/getWishlist");
router.post('/signup', validateSignup, signup);
router.post('/login',login)
router.get('/profile',protect,myProfile)
router.post('/addwishlist',protect,addToWishlist)
router.delete('/removewishlist',protect,removeFromWishlist)
router.get('/getwishlist',protect,getWishlist)

module.exports = router;