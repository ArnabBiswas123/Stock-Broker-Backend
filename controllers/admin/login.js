const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const login=async(req, res)=>{
    try {
        let { user_name, password } = req.body;
        if (!user_name || !password) {
            return res.json({ success: false, msg: "Send all fields" });
          }
          let userData = await Admin.findOne({ user_name });
          if (!userData) {
            return res
              .status(400)
              .json({ success: false, msg: "Try logging valid credentials" });
          }
          const pwdCompare = await bcrypt.compare(
            req.body.password,
            userData.password
          );
      
          if (!pwdCompare) {
            return res
              .status(400)
              .json({ success: false, msg: "Try logging valid credentials" });
          }
      
          const data = {
            userData: {
              id: userData.id,
            },
          };
          const authToken = await jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
          return res.json({ success: true, token: authToken });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "Internal server error" }); 
    }
}
module.exports=login