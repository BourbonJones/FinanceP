const mongoose = require("mongoose");

//Schemas/Models
const operation = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    person: {
        type: String,
        required: true
    }
});
var Operation = mongoose.model("Operation", operation);
module.exports = Operation;