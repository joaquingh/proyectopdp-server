/*

Controladora de Usuario

*/
var Menu = require('../models/menu');
var fs = require('fs');

/**
 * Crea un usuario 
 */
var createMenu = function(req, res) {

    var unMenu = new Menu(req.body);

    unMenu.save(function(err, menuSalvado) {
        if (err) {
            console.log("Error al guardar un menu:" + err);
            res.status(400).end();
        } else {
            /*fs.writeFile('pedrito', usuario, function (err) {//Averiguar como insertar el archivo en otra ubicación y convertir de formato base64 a imagen
                if (err) throw err;
                console.log('Saved!');
            });*/
            res.status(200).json(menuSalvado);
        }
    });
}
var getMenuById = function(req, res) {

    Menu.findById(req.params.id, function(err, menu) {
        if (err) {
            console.log(err);
        } else {
            res.send(menu);
        }

    })
}
var updateMenuById = function(req, res) {
    console.log(req.body);
    Menu.findByIdAndUpdate(eq.params.id, req.body, function(err, menu) {
        if (err) {
            console.log(err);
        } else {
            res.send(menu);
        }

    })
}
var deleteMenu = function(req, res) {

    Menu.findByIdAndRemove(req.body.eliminar, function(err, menuEliminado) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).end();
        }
    })
}
var getAllMenus = function(req, res) {
    Menu.find(function(err, menus) {
        if (err) {
            console.log("Error al traer todos los menus");
        } else {
            res.status(200).json(menus);
        }
    });
}

//Es necesario exportar todos los métodos que quieran ser utilizados desde rutas
module.exports = { createMenu, getAllMenus, deleteMenu, getMenuById, updateMenuById };