const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const { operation } = require("./database");

//BODY PARSER
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

//ROUTES

routes.get('/server/operation/:personId', async (req, res) => {
    var message = await operation.getOperations(req.params.personId);
    res.send(message);
});

routes.post('/server/operation/:personId', async (req, res) => {
    var message = await operation.storeOparation(req.body.item, req.body.date, req.body.value, req.body.category, req.params.personId);
    res.send(message);
});

routes.delete('/server/operation/:opId', async (req, res) => {
    var message = await operation.deleteOperation(req.params.opId);
    res.send(message);
});

routes.put('/server/operation/:opId', async (req, res) => {
    var message = await operation.changeOperation(req.params.opId, req.body.item, req.body.date, req.body.value, req.body.category, req.body.person);
    res.send(message);
});

module.exports = routes;