const Stocks = require("../models/Stocks");
require("dotenv").config();

const chartData = async (req, res) => {
  const query = req.query.q;
  const date=req.query.date;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }
  try {
    const token = process.env.API_KEY;

    const result = await Stocks.find({ ticker: query });

    if (result.length === 0) {
      return res.json({ success: false, msg: "company does not exists" });
    }

    const response = await fetch(
      `https://api.tiingo.com/iex/${query}/prices?startDate=${date}&resampleFreq=12hour&token=${token}`
    );
    const details = await response.json();
    if(details.detail){
      return res.json({success:false, msg:'You have run over your hourly request allocation. Try after some time'})
    }
    const formattedDetails = details.map((item) => {
      return {
        ...item,
        date: item.date.split("T")[0], 
      };
    });

    // const currentDate = new Date();
    // const pastDate = new Date(currentDate.getTime() - 12 * 60 * 60 * 1000); // 12 hours ago
    // const formattedPastDate = pastDate.toISOString(); // ISO format for the API

    // const todayResponse = await fetch(
    //   `https://api.tiingo.com/iex/${query}/prices?startDate=${formattedPastDate}&resampleFreq=5min&token=${token}`
    // );
    // const todayDetails = await todayResponse.json();

    // if (todayDetails.detail) {
    //   return res.json({
    //     success: false,
    //     msg: "You have run over your hourly request allocation. Try after some time",
    //   });
    // }
    // const formattedTodayDetails = todayDetails.map((item) => {
    //   return {
    //     ...item,
    //     date: item.date.split("T")[0], // Format date as YYYY-MM-DD
    //   };
    // });
    return res.json({ success: true, data: formattedDetails});
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports = chartData;
