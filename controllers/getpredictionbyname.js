const Prediction = require("../models/Prediction");

const getpredictionbyname = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.json({ success: false, msg: "name should be there" });
  }
  try {
    const prediction = await Prediction.findOne({ name: name });

    if (!prediction) {
      return res
        .status(404)
        .json({
          success: false,
          msg: `Prediction with name '${name}' not found`,
        });
    }

    res.status(200).json({ success: true, prediction: prediction });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Internal server error." });
  }
};

module.exports = getpredictionbyname;
