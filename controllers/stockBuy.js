const User = require("../models/User");
const Stocks = require("../models/Stocks");

const stockBuy = async (req, res) => {
  try {
    const { ticker, quantity, price  } = req.body;
    const userId = req.user.id;
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
      return res.json({ success: false, msg: "company does not exists" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    const totalCost = quantity * price;
    if (user.balance < totalCost) {
      return res
        .status(400)
        .json({ success: false, msg: "Insufficient balance." });
    }
    user.balance -= totalCost;

    if (!Array.isArray(user.purchases)) {
      user.purchases = [];
    }
    const existingPurchase = user.purchases.find(
      (purchase) => purchase.stock.toString() === stock._id.toString()
    );

    if (existingPurchase) {
      existingPurchase.quantity += quantity;
      existingPurchase.price =
        (existingPurchase.price * existingPurchase.quantity +
          price * quantity) /
        (existingPurchase.quantity + quantity);
    } else {
      
      user.purchases.push({
        stock: stock._id,
        quantity,
        price,
      });
    }
  

    if (!Array.isArray(user.transaction)) {
      user.transaction = [];
    }
    user.transaction.push({
      type: "buy",
      amount: totalCost,
      quantity:quantity,
      stock: stock._id,
    });

    await user.save();

    return res
      .status(200)
      .json({ success: true, msg: "Stock purchased successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports = stockBuy;
