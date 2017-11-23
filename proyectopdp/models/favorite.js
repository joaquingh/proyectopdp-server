'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favSchema = Schema({
    user_id: String,
    menus: [{menu_id:String}]
});
/*
menus: 
    [{
        nombre: String,
        descripcion: String,
        ubicacion: String,
        receta: String,
        preparacion: String,
        foto: String,
        puntuacion: [{user_id: String, calificacion: Number, comentario: String}],
        tipo: String,
        ingredientes: Array,
        user_id: String
    }]
*/

var modelo = mongoose.model('Favorite', favSchema);

module.exports = modelo;