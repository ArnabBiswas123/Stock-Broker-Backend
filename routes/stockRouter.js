const express = require("express");
const searchStock = require("../controllers/searchStock");
const stockDetails=require("../controllers/stockDetails");
const { protect } = require('../middleware/authToken');
const news = require("../controllers/news");
const chartData = require("../controllers/chartData");
const router = express.Router();



router.get('/search',protect, searchStock);
router.get('/stockdetails',protect, stockDetails);
router.get('/stocknews',protect, news);
router.get('/stockchart',protect, chartData);


module.exports = router;