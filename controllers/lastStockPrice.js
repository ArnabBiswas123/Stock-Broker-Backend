const Stocks = require("../models/Stocks");
require("dotenv").config();

const lastStockPrice = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const token = process.env.API_KEY;
    const result = await Stocks.find({ ticker: query });
    if (result.length === 0) {
      return res.json({ success: false, msg: "company does not exists" });
    }


    const response2 = await fetch(
      `https://api.tiingo.com/iex?tickers=${query}&token=${token}`
    );

    let data = await response2.json();
    // console.log(data);
    if(data.detail){
      return res.json({success:false, msg:'You have run over your hourly request allocation. Try after some time'})
    }
    dataobj = {};
    data = data[0];
    
    dataobj["lastPrice"] = data["last"].toFixed(2);

    return res.json({ success: true,  price:dataobj });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports = lastStockPrice;
