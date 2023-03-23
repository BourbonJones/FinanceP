const mongoose = require("mongoose");

//Schemas/Models
const person = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
});
var Person = mongoose.model("Person", person);
module.exports = Person;