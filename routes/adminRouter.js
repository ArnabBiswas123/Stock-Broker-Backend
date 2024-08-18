const express = require("express");
const signup = require("../controllers/admin/signup");
const login = require("../controllers/admin/login");
const { protectadmin } = require("../middleware/authAdmin");
const myProfile = require("../controllers/admin/myProfile");
const searchUserByEmail = require("../controllers/admin/searchUserByEmail");
const activateUserByEmail = require("../controllers/admin/activeUserByEmail");
const deactivateUserByEmail = require("../controllers/admin/deactiveUserByEmail");
const searchStock = require("../controllers/searchStock");
const stockDetails = require("../controllers/stockDetails");
const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.get('/myprofile',protectadmin,myProfile)
router.get('/searchuser',protectadmin,searchUserByEmail)
router.post('/activeuser',protectadmin,activateUserByEmail)
router.post('/deactiveuser',protectadmin,deactivateUserByEmail)
router.get('/search',protectadmin,searchStock);

router.get('/stockdetails',protectadmin, stockDetails);

module.exports = router;