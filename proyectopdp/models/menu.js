'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = Schema({
    nombre: String,
    descripcion: String,
    ubicacion: String,
    receta: String,
    preparacion: String,
    foto: String,
    puntuacion: [{user_id: String, calificacion: Number, comentario: String}],
    tipo: String,
    ingredientes: Array
});

var modelo = mongoose.model('Menu', menuSchema);

module.exports = modelo;