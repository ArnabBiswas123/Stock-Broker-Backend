const User = require("../models/User");
const Stocks = require("../models/Stocks");

const stockSell = async (req, res) => {
  try {
    const { ticker, quantity, price } = req.body;
    const userId = req.user.id;

    // Validate request
    if (!ticker || !quantity || !price ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // if (method.toLowerCase() !== "card" && method.toLowerCase() !== "upi") {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: "Invalid payment method." });
    // }
    if (
      !Number.isInteger(quantity) || 
      quantity <= 0 ||
      typeof price !== "number" ||
      price <= 0
    ) {
      return res.status(400).json({
        success: false,
        msg: "Invalid input: quantity should be a positive integer and price should be a positive number.",
      });
    }

    const stock = await Stocks.findOne({ ticker });
    if (!stock) {
      return res.json({ success: false, msg: "Company does not exist." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found." });
    }

    // Find the purchase record for the stock
    const purchaseRecord = user.purchases.find(
      (purchase) => purchase.stock.toString() === stock._id.toString()
    );

    if (!purchaseRecord || purchaseRecord.quantity < quantity) {
      return res.status(400).json({
        success: false,
        msg: "You do not own enough of this stock to sell.",
      });
    }

 
    const totalRevenue = quantity * price;


    user.balance += totalRevenue;

   
    if (purchaseRecord.quantity > quantity) {
      purchaseRecord.quantity -= quantity;
    } else {
      user.purchases = user.purchases.filter(
        (purchase) => purchase.stock.toString() !== stock._id.toString()
      );
    }


    if (!Array.isArray(user.transaction)) {
      user.transaction = [];
    }
    user.transaction.push({
      type: "sell",
      quantity:quantity,
      amount: totalRevenue,
      stock: stock._id,
    });

  
    await user.save();

    return res
      .status(200)
      .json({ success: true, msg: "Stock sold successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error." });
  }
};

module.exports = stockSell;
