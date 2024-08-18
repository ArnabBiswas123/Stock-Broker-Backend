const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    let { user_name, password } = req.body;
    if (!user_name || !password) {
      return res.json({ success: false, msg: "Send all fields" });
    }
    const userexists = await Admin.findOne({ user_name });
    if (userexists) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "Already Exists, please login to your account",
        });
    }
    const salt = await bcrypt.genSalt(10);
    const securepassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
      user_name,
      password: securepassword,
    });

    return res.json({ success: true, msg:"Admin created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports = signup;
