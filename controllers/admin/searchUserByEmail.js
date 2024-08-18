const User = require('../../models/User'); 


const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query; 

    if (!email) {
      return res.status(400).json({success:false, msg: 'Email is required' });
    }

    const user = await User.findOne({ email }).select("-password -wishlist -balance -transaction -purchases");

    if (!user) {
      return res.status(404).json({success:false, msg: 'User not found' });
    }

    return res.status(200).json({success:true, user:user });
  } catch (error) {
    console.error('Error finding user by email:', error);
    return res.status(500).json({  success: false, msg: "Internal server error"  });
  }
};

module.exports =  searchUserByEmail ;
