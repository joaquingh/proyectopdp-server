'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favSchema = Schema({
    user_id: String,
    menus: [{menu_id:String}]
});

var modelo = mongoose.model('Favorite', favSchema);

module.exports = modelo;