const express = require("express");
const router = express.Router();
const { validateSignup, signup } = require('../controllers/signup');
const login = require("../controllers/login");
const { protect } = require('../middleware/authToken');
const myProfile = require("../controllers/myProfile");
const addToWishlist = require("../controllers/addWishlist");
const removeFromWishlist = require("../controllers/removeFromWishlist");
const getWishlist = require("../controllers/getWishlist");
const depositMoney = require("../controllers/depositMoney");
const withdrawMoney = require("../controllers/withdrawMoney");
const checkBalance = require("../controllers/checkBalance");
const getAllTransactions = require("../controllers/getAllTransactions");
router.post('/signup', validateSignup, signup);
router.post('/login',login)
router.get('/profile',protect,myProfile)
router.post('/addwishlist',protect,addToWishlist)
router.delete('/removewishlist',protect,removeFromWishlist)
router.get('/getwishlist',protect,getWishlist)
router.post('/depositmoney',protect,depositMoney)
router.post('/withdrawmoney',protect,withdrawMoney)
router.get('/checkbalence',protect,checkBalance)
router.get('/alltransactions',protect,getAllTransactions)

module.exports = router;