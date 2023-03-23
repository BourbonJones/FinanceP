const Person = require("../models/person");

async function getPerson(person) {
    let p = await Person.find({name: person});
    return p;
}

async function getPersonById(id) {
    let p = await Person.findById(id);
    return p;
}

async function getAllPeople() {
    let p = await Person.find();
    return p;
}

async function storePerson(name, senha) {
    let newP = new Person({ name: name, senha: senha });
    console.log(newP);
    try {
        await newP.save();
        return {"message": newP};
    } catch (err) {
        return {"message": err};
    }
}

async function deletePerson(id) {
    try {
        await Person.findByIdAndRemove(id)
        return {"message": "Person deleted"};
    } catch (err) {
        return {"message": err};
    }
}

module.exports = {
    getPerson: getPerson,
    storePerson: storePerson,
    deletePerson: deletePerson,
    getAllPeople: getAllPeople,
    getPersonById: getPersonById
}