const User = require("../models/User");
const getAllPurchases = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const user = await User.findById(userId).populate("purchases.stock");
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }
  
      const sortedpurchases = user.purchases.sort((a, b) => b.createdAt - a.createdAt);
      return res.status(200).json({
        success: true,
        purchases: sortedpurchases ,
      });
    } catch (error) {
      console.error("Error retrieving purchases:", error);
      return res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  
  module.exports = getAllPurchases;
  