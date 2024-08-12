const User = require("../models/User");
const Stocks = require("../models/Stocks");

const removeFromWishlist = async (req, res) => {
  try {
    const ticker = req.body.ticker;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const stock = await Stocks.findOne({ ticker: ticker });

    if (!stock) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const stockIndex = user.wishlist.indexOf(stock._id);
    if (stockIndex === -1) {
      return res
        .status(400)
        .json({ success: false, msg: "Stock not in wishlist" });
    }

    user.wishlist.splice(stockIndex, 1);

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Stock removed from wishlist" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};

module.exports = removeFromWishlist;
