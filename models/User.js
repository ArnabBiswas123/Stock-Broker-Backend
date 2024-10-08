const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "withdraw", "buy", "sell"],
      required: true,
    },
    method: {
      type: String,
      enum: ["card", "upi"],
      required: function () {
        return this.type === "deposit" || this.type === "withdraw";
      },
    },
    account: {
      type: String,
      required: function () {
        return this.type === "deposit" || this.type === "withdraw";
      },
    },
    amount: { type: Number, required: true },
    quantity: {
      type: Number,
      required: function () {
        return this.type === "buy" || this.type === "sell";
      },
    },
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

const purchaseSchema = new Schema(
  {
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stocks",
      required: true,
    },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true,  unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true, required:true },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stocks" }],
    balance: { type: Number, default: 0 },
    transaction: [transactionSchema],
    purchases: [purchaseSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userModel);
