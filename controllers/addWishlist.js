const User = require("../models/User");
const Stocks = require("../models/Stocks");

const addToWishlist = async (req, res) => {
  try {
    const ticker = req.body.ticker;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const stock = await Stocks.findOne({ ticker: ticker });

    if (!stock) {
      return res.json({ success: false, msg: "Company does not exist" });
    }

    if (user.wishlist.includes(stock._id)) {
      return res
        .status(400)
        .json({ success: false, msg: "Stock already in wishlist" });
    }

    user.wishlist.push(stock._id);

    await user.save();

    return res
      .status(200)
      .json({ success: true, msg: "Stock added to wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};

module.exports = addToWishlist;
