const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { person, operation } = require("./database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES

routes.get('/server/person/:person', async (req, res) => {
    var message = await person.getPerson(req.params.person);
    res.send(message);
});

routes.get('/server/personId/:id', async (req, res) => {
    var message = await person.getPersonById(req.params.id);
    res.send(message);
});

routes.get('/server/person/', async (req, res) => {
    var message = await person.getAllPeople();
    res.send(message);
});

routes.post('/server/person', async (req, res) => {
    var message = await person.storePerson(req.body.nome, req.body.senha);
    res.send(message);
});

routes.delete('/server/person/:personId', async (req, res) => {
    try {
        var ops = await operation.getOperations(req.params.personId);
        for (let i in ops.message) {
            await operation.deleteOperation(ops.message[i]._id);
        }
        var message = await person.deletePerson(req.params.personId);
        res.send(message);
    } catch (err) { res.send(err) }
});

module.exports = routes;