const User = require("../models/User");
const depositMoney = async (req, res) => {
  try {
    const { method, account, amount } = req.body;
    const userId = req.user.id;

    if (method.toLowerCase() !== 'card' && method.toLowerCase() !== 'upi') {
        return res.status(400).json({success:false, msg: 'Invalid payment method.' });
      }

      if (typeof amount !== 'number' ||  amount <= 0) {
        return res.status(400).json({ success: false, msg: 'Invalid input: Amount should be a positive number.' });
      }

      if (!account) {
        return res.status(400).json({ success: false, msg: 'Account information is required.' });
      }
  
   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    if (typeof user.balance !== 'number') {
        user.balance = 0;
      }
      if (!Array.isArray(user.transaction)) {
        user.transaction = [];
      }
  
    user.balance +=amount;

   
    const newTransaction = {
      type: "deposit",
      method,
      account,
      amount,
    };


    user.transaction.push(newTransaction);

   
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Deposit successful",
      balance: user.balance,
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error depositing money:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};

module.exports = depositMoney;
