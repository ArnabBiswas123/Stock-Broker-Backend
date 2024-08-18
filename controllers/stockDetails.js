const Stocks = require("../models/Stocks");
require("dotenv").config();

const stockDetails = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const token = process.env.API_KEY;

    const result = await Stocks.find({ ticker: query });

    // console.log(result);

    if (result.length === 0) {
      return res.json({ success: false, msg: "company does not exists" });
    }

    const response = await fetch(
      `https://api.tiingo.com/tiingo/daily/${query}?token=${token}`
    );
    const details = await response.json();

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
    // console.log(data);
    dataobj["lastPrice"] = data["last"].toFixed(2);
    dataobj["prevClose"] = data["prevClose"].toFixed(2);
    dataobj["change"] = dataobj["lastPrice"] - dataobj["prevClose"];
    dataobj["change"] = dataobj["change"].toFixed(2);
    dataobj["changePercent"] = (dataobj["change"] / dataobj["prevClose"]) * 100;
    dataobj["changePercent"] = dataobj["changePercent"].toFixed(2);
    const currentTime = new Date();

    var day = currentTime.getDate();
    if (day < 10) day = "0" + day;
    var month = currentTime.getMonth();
    month += 1;
    if (month < 10) month = "0" + month;
    var year = currentTime.getFullYear();
    var hour = currentTime.getHours();
    if (hour < 10) hour = "0" + hour;

    var min = currentTime.getMinutes();
    if (min < 10) min = "0" + min;

    var sec = currentTime.getSeconds();
    if (sec < 10) sec = "0" + sec;
    var dtString =
      year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    dataobj["currentTimeStamp"] = dtString;
    var timestamp = new Date(data["timestamp"]);

    day = timestamp.getDate();
    if (day < 10) day = "0" + day;
    month = timestamp.getMonth();
    month += 1;
    if (month < 10) month = "0" + month;
    year = timestamp.getFullYear();
    hour = timestamp.getHours();
    if (hour < 10) hour = "0" + hour;

    min = timestamp.getMinutes();
    if (min < 10) min = "0" + min;
    sec = timestamp.getSeconds();
    if (sec < 10) sec = "0" + sec;
    dtString =
      year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
    dataobj["timestamp"] = dtString;
    var secondsPassed = (currentTime.getTime() - timestamp.getTime()) / 1000;
    var marketClosed = true;
    if (secondsPassed <= 60) marketClosed = false;
    dataobj["marketStatus"] = marketClosed;
    dataobj["highPrice"] = data["high"].toFixed(2);
    dataobj["lowPrice"] = data["low"].toFixed(2);

    if (!data["mid"] && !dataobj["marketStatus"]) dataobj["midPrice"] = "-";

    if (data["mid"]) dataobj["midPrice"] = data["mid"].toFixed(2);

    if (data["volume"]) dataobj["volume"] = data["volume"].toFixed(2);

    if (data["bidPrice"]) dataobj["bidPrice"] = data["bidPrice"].toFixed(2);

    if (data["bidSize"]) dataobj["bidSize"] = data["bidSize"].toFixed(2);

    if (data["askPrice"]) dataobj["askPrice"] = data["askPrice"].toFixed(2);

    if (data["askSize"]) dataobj["askSize"] = data["askSize"].toFixed(2);

    if (data["open"]) dataobj["openPrice"] = data["open"].toFixed(2);

    if (!dataobj["marketStatus"] && !dataobj["midPrice"])
      dataobj["midPrice"] = "-";

    return res.json({ success: true, data: details, otherData:dataobj });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports = stockDetails;
