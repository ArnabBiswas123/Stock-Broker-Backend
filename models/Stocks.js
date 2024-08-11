// models/Stock.js
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    companyName: String,
    ticker: String
    // Add other fields as necessary
});

const Stock = mongoose.model('Stocks', stockSchema);

module.exports = Stock;
