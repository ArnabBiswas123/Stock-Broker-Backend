const User = require("../models/User");
const checkBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (typeof user.balance !== "number") {
      user.balance = 0;
    }

    return res.status(200).json({
      success: true,
      balance: user.balance,
    });
  } catch (error) {
    console.error("Error checking balance:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = checkBalance;
