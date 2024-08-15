const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "withdraw", "buy", "sell"],
      required: true,
    },
    method: { type: String, enum: ["card", "upi"], required: true },
    account:{type:String,required:true},
    amount: { type: Number, required: true },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stocks",
      required: function () {
        return this.type === "buy" || this.type === "sell";
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stocks" }],
    balance:{type:Number,default:0},
    transaction: [transactionSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userModel);
