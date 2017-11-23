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
            res.status(200).json(menuSalvado);
        }
    });
}
var createMenuPhoto = function(req, res) {
    
    var unMenu = new Menu(req.body);
    var menuActualizado = null;
    var imagen = req.body.foto;
    var url = "http://192.168.1.7:3000/images/" // Repositorio de imagenes
    var id = null;

    unMenu.save(function(err, menuSalvado) {
        if (err) {
            console.log("Error al guardar un menu:" + err);
            res.status(400).end();
        } else {
            if(menuSalvado != null){
                url = url + menuSalvado.id +".jpg";
                id = menuSalvado.id;
                var bitmap = new Buffer(imagen, 'base64');
                fs.writeFile('public/images/'+menuSalvado.id+'.jpg', bitmap, function (err) {
                    if (err) throw err;
                    console.log('Photo saved!');
                    if(id != null){
                        var menu = Menu.findByIdAndUpdate({_id:id},{$set:{foto:url}});
                        menu.exec(function(err, respuesta){
                            if (err) return res.json(err);
                            res.json(respuesta);
                        });
                    }else{
                        res.status(400).end("Error al obtener _id de menu");
                    }
                });
            }
        }
    });
}
var addComentaryById = function(req, res){
    //console.log("Id: "+req.params.id);
    //console.log("Body: "+JSON.stringify(req.body));
    var menu = Menu.findByIdAndUpdate(
        req.params.id, 
        {$push:{puntuacion:req.body}});
    menu.exec(function(err, respuesta){
        if (err) return res.status(400).end("Error al insertar comentario");
        res.json(respuesta);
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
module.exports = { addComentaryById, createMenu, createMenuPhoto, getAllMenus, deleteMenu, getMenuById, updateMenuById };