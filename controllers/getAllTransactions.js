const User = require("../models/User");
const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("transaction.stock");
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (!Array.isArray(user.transaction)) {
      user.transaction = [];
    }
    const sortedTransactions = user.transaction.sort((a, b) => b.createdAt - a.createdAt);
    return res.status(200).json({
      success: true,
      transactions: sortedTransactions ,
    });
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = getAllTransactions;
