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
            //EXAMPLE: var image = "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";
            var image = menuSalvado.foto
            var bitmap = new Buffer(image, 'base64');
            fs.writeFile('public/images/'+menuSalvado.id+'.jpg', bitmap, function (err) {//Averiguar como convertir de formato base64 a imagen
                if (err) throw err;
                console.log('Saved!');
            });
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