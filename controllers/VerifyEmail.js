const EmailOtp = require("../models/EmailOtp");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const varifyEmail = async (req, res) => {
    try {
      const {  otp,password } = req.body;
     
        const generatedotp = await EmailOtp.findOne({ email: req.user.email });
        if (!generatedotp) {
          res.status(400).json({ success: false, msg: "Time limit exceeds" });
        } else {
          const otpCompare = await bcrypt.compare(otp, generatedotp.otp)


   
          if (otpCompare) {

            const salt = await bcrypt.genSalt(10);
            
            const hashedPassword = await bcrypt.hash(password, salt);
          await  User.findOneAndUpdate({email:req.user.email},{password:hashedPassword},{new:true})
       
            res
              .status(200)
              .json({ success: true, msg: "Email varified successfully" });
          } else {
            res
              .status(400)
              .json({ success: false, msg: "otp is not correct" });
          }
        }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  };
  module.exports = varifyEmail;