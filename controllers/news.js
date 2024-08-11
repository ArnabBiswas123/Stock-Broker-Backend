const Stocks = require("../models/Stocks");
require("dotenv").config();
const news = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const token = process.env.NEWS_API_KEY;

    const result = await Stocks.find({ ticker: query });

    if (result.length === 0) {
      return res.json({ success: false, msg: "company does not exists" });
    }
    const response = await fetch(
      `https://newsapi.org/v2/everything?apiKey=${token}&q=${query}`
    );
    const data = await response.json();
    var counter = 0;
    var newsObject = [];
    // maxLength = 20;
    for (var index in data.articles) {
      dataObject = {};

      index = +index;

      var publisher = data.articles[index]["source"]["name"];

      var publishedDate = data.articles[index]["publishedAt"];

      var title = data.articles[+index]["title"];

      var description = data.articles[index]["description"];

      var url = data.articles[index]["url"];

      var urlToImage = data.articles[index]["urlToImage"];

      dataObject["publisher"] = publisher;
      dataObject["publishedAt"] = publishedDate;
      dataObject["title"] = title;
      dataObject["description"] = description;
      dataObject["url"] = url;
      dataObject["urlToImage"] = urlToImage;
      newsObject.push(dataObject);
      counter += 1;
      if (counter == 10) break;
    }
    return res.json({ success: true, data: newsObject });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports = news;
