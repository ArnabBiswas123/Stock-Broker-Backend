const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const validateSignup = [
    body('name').trim().not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('password') .trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
  ];
const signup = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: errors.array()[0].msg });
    }

  try {
    let { name,email, password } = req.body;

    const userexists = await User.findOne({ email });
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
    const user = await User.create({
      name,
      email,
      password: securepassword,
    });

    return res.json({ success: true, msg:"User created successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Internal server error" });
  }
};
module.exports ={ validateSignup, signup };
