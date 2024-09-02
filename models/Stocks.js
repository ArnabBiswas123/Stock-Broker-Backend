// models/Stock.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    name: String,
    ticker: String
});

const Stock = mongoose.model('Stocks', stockSchema);

module.exports = Stock;
