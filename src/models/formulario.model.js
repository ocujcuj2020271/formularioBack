var mongoose = require('mongoose')
var Schema = mongoose.Schema;

const FormularioSchema = Schema({
    carnet: String,
    nombre: String,
    direccion: String,
    genero: String,
    telefono: Number,
    fechaNacimiento: String,
    carrera: String,
    tipoPoesia: String,
    fechaIncripcion: String,
    fechaEntrega: String
});

module.exports = mongoose.model('Formularios', FormularioSchema);