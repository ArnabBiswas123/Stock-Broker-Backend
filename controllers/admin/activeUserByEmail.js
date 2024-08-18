const User = require("../../models/User");

const activateUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, msg: "Email is required" });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { active: true } },
      { new: true }
    ).select("-password -wishlist -balance -transaction -purchases");

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, msg: "User activated successfully", user: user });
  } catch (error) {
    console.error("Error activating user:", error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal server error" });
  }
};

module.exports = activateUserByEmail;
