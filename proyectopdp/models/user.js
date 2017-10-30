'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    nombre: String,
    clave: String,
    mail: String
});

var modelo = mongoose.model('User', userSchema);

module.exports = modelo;