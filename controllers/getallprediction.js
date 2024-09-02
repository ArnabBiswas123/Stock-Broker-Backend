const Prediction = require("../models/Prediction");

const getallprediction = async (req, res) => {
  try {
    const predictions = await Prediction.find({});

    const modifiedPredictions = predictions.map((prediction) => ({
      name: prediction.name,
      closeFirst: prediction.close[0],
      highFirst: prediction.high[0],
      lowFirst: prediction.low[0],
      openFirst: prediction.open[0],
    }));
    return res.json({ success: true, data: modifiedPredictions });
  } catch (error) {
    console.error(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports=getallprediction
