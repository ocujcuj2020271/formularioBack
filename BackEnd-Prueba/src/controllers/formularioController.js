var Formularios = require('../models/formulario.model');

function crearFormulario(req, res) {
    var fechaActual = new Date();
    var formularioModel = new Formularios();
    var fechaHoy = fechaActual.toISOString().split('T')[0];
    var anoActual = parseInt(fechaActual.getFullYear());
    var ultimoDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0)
    var fin = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + 5 - fechaActual.getDay());
    var parametros = req.body;
    var i = 0;

    if (parametros.carnet && parametros.nombre && parametros.direccion && parametros.genero
        && parametros.telefono && parametros.fechaNacimiento && parametros.carrera && parametros.tipoPoesia) {
        if (parametros.carnet?.length === 6) {
            if (parametros.carnet?.charAt(0) === 'A') {
                if (parametros.carnet?.charAt(2) === '5' && parametros.carnet?.includes('0') === false) {
                    if (parametros.carnet?.charAt(5) === '1' || parametros.carnet?.charAt(5) === '3' || parametros.carnet?.charAt(5) === '9') {
                        if ((anoActual - parseInt(String(parametros.fechaNacimiento).substring(0, 4))) >= 17) {
                            if(parametros.tipoPoesia=='Dramatico' || parametros.tipoPoesia == 'Épico'|| parametros.tipoPoesia == 'Lírica' ){
                                formularioModel.carnet = parametros.carnet;
                            formularioModel.nombre = parametros.nombre;
                            formularioModel.direccion = parametros.direccion;
                            formularioModel.genero = parametros.genero;
                            formularioModel.telefono = parametros.telefono;
                            formularioModel.fechaNacimiento = parametros.fechaNacimiento;
                            formularioModel.carrera = parametros.carrera;
                            formularioModel.tipoPoesia = parametros.tipoPoesia;
                            formularioModel.fechaIncripcion = fechaHoy;

                            if (parametros.carnet?.charAt(5) === '1' && parametros.tipoPoesia == 'Dramatico') {

                                while (i < 5) {
                                    fechaActual.setTime(fechaActual.getTime() + 24 * 60 * 60 * 1000);
                                    if (fechaActual.getDay() != 6 && fechaActual.getDay() != 0)
                                        i++;
                                }

                                formularioModel.fechaEntrega = fechaActual;

                            } else if (parametros.carnet?.charAt(5) === '3' && parametros.tipoPoesia == 'Épico') {

                                formularioModel.fechaEntrega = ultimoDia;

                            } else {
                                
                                formularioModel.fechaEntrega = fin;
                            }


                            formularioModel.save((err, agregarFormulario) => {
                                if (err) return res.status(404).send({ Error: "Ocurrio un Error." });
                                if (!agregarFormulario) return res.status(500).send({ Error: "No sé puede crear el formulario" });

                                return res.status(200).send({ Formulario: agregarFormulario })
                            })
                            }else{
                                return res.status(500).send({ Error: "Solo puedes ingresar con los generos Literarios Dramatico, Épico o Lírica" });
                            }
                        } else {
                            return res.status(500).send({ Error: "No puedes ingresar porque eres menor de 17 años." });
                        }


                    } else {
                        return res.status(500).send({ Error: "El Carnet debe de terminar en 1, 3 o 9." });
                    }
                } else {
                    return res.status(500).send({ Error: "El Carnet debe de llevar 5 en el 3 caracter y No poseer ningun 0" });
                }
            } else {
                return res.status(500).send({ Error: "El Carnet no es valido" });
            }
        } else {
            return res.status(500).send({ Error: "El Carnet tiene que llevar 6 caracteres" });
        }
    } else {
        return res.status(500).send({ Error: "Debe de ingresar toda la informacion solicitada" })
    }
}

function verFormularios(req, res) {
    Formularios.find({}, (err, Formulario) => {
        if (err) return res.status(500).send({ mensaje: 'Error' })
        if (!Formulario) return res.status(404).send({ mensaje: 'No hay datos' })

        return res.status(200).send({ Formularios: Formulario })
    })
}

module.exports = {
    crearFormulario,
    verFormularios
}