require('dotenv').config();
const mongoose = require("mongoose");
const operation = require("./controllers/operationController");
const person = require("./controllers/personController");

//Database
async function connectToDatabase() {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = mongoose.connection; //Infos about mongoose connection
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to the database. "));
}

//EXPORTS
module.exports = {
    connectToDatabase: connectToDatabase,
    operation: operation,
    person: person
}

