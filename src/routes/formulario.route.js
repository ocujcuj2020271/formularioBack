const express = require('express');
const controllerFormulario = require("../controllers/formularioController")
var api = express.Router()

api.post("/crearFormulario", controllerFormulario.crearFormulario);
api.get("/participantes", controllerFormulario.verFormularios);

module.exports = api;