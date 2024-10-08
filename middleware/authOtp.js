const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protectOtp = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
         
        req.user = await User.findOne({email:decoded.userData.email}).select("-password -wishlist -balence -transaction -purchases");
        if(!req.user||req.user.active===false){
          return res.status(401).json({success:false, msg:'User is not autherized'})
        }
  
        next();
      } catch (error) {
        return res.status(401).json({success:false, msg:'Token is not correct'});
      }
    }
  
    if (!token) {
      return res.status(401).json({success:false, msg:'Token is not there'});
    }
  };
  
  module.exports = { protectOtp };