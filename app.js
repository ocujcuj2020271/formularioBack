const express = require('express');
const cors = require('cors');
const app = express();

const rutaFormulario = require('./src/routes/formulario.route')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', rutaFormulario);

module.exports= app;