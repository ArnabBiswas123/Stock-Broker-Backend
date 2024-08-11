const myProfile=async(req,res)=>{
   return res.json({success:true,user:req.user})
}
module.exports=myProfile