const mongoose = require('mongoose');



const predictionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    close: {
        type: [Number], 
        required: true,
        validate: [arrayLimit, '{PATH} must have 7 elements'] 
    },
    high: {
        type: [Number], 
        required: true,
        validate: [arrayLimit, '{PATH} must have 7 elements'] 
    },
    low: {
        type: [Number], 
        required: true,
        validate: [arrayLimit, '{PATH} must have 7 elements'] 
    },
    open: {
        type: [Number], 
        required: true,
        validate: [arrayLimit, '{PATH} must have 7 elements'] 
    }
});

function arrayLimit(val) {
    return val.length === 7;
}

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;

