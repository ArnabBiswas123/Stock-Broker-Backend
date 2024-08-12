const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userModel=new Schema({
    name:{type:String,required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stocks" }]
},{
    timestamps:true,
})
module.exports=mongoose.model('User',userModel);