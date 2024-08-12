const User = require("../models/User");

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");

    if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.status(200).json({ success:true, wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};

module.exports =  getWishlist ;
