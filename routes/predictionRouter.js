const express = require("express");

const { protect } = require('../middleware/authToken');
const getallprediction = require("../controllers/getallprediction");
const getpredictionbyname = require("../controllers/getpredictionbyname");

const router = express.Router();



router.get('/getallprediction',protect, getallprediction);
router.get('/getpredictionbyname/:name',protect,getpredictionbyname)




module.exports = router;