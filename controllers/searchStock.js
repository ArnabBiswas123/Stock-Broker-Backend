const Stocks = require("../models/Stocks");

const searchStock = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const regex = new RegExp(query, "i"); // Case-insensitive regex for partial matching
    const results = await Stocks.find({ companyName: regex }).limit(5).exec();

    if (results.length === 0) {
      return res.json({ success: true, data: [] });
    }

    return res.json({ success: true, data: results });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports = searchStock;
