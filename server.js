//Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8081;
const db = require("./database");
const cors = require("cors");
const routesPerson = require("./routesPerson");
const routesOperation = require("./routesOperation");

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use(cors());

app.use(routesPerson);
app.use(routesOperation);

db.connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((erro) => {
    console.log(`Erro ao conectar ao banco de dados: ${erro}`);
  });
