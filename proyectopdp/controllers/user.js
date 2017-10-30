/*

Controladora de Usuario

*/
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

/**
 * Crea un usuario 
 */
var createUser = function(req, res) {
 
    var hash = bcrypt.hashSync(req.body.clave);//ENCRIPTO LA CLAVE
    req.body.clave = hash;//LA GUARDO EN EL BODY

    var unUsuario = new User(req.body);
    unUsuario.save(function(err, usuarioSalvado) {
        if (err) {
            console.log("Error al guardar un usuario:" + err);
            res.status(400).end();
        } else {

            res.status(200).json(usuarioSalvado);
        }
    });


}
var getUserById = function(req, res) {

    User.findById(req.params.id, function(err, usuario) {
        if (err) {
            console.log(err);
        } else {
            //bcrypt.compareSync("bacon", hash); // true
            //bcrypt.
            //usuario.clave 
            res.send(usuario);
        }

    })
}
var doLogin = function(req, res) {
    User.find({mail:req.params.email}, function(err, usuario) {
        if (err) {
            console.log(err);
        } else {
            //bcrypt.compareSync(clave_digitada, hash); // true = clave correcta
            res.send(usuario);
        }
    })
}
var updateUserById = function(req, res) {
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, req.body, function(err, usuario) {
        if (err) {
            console.log(err);
        } else {
            res.send(usuario);
        }

    })
}
var deleteUser = function(req, res) {

    User.findByIdAndRemove(req.body.eliminar, function(err, usuarioEliminado) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).end();
        }
    })
}
var getAllUsers = function(req, res) {
    User.find(function(err, usuarios) {
        if (err) {
            console.log("Error al traer todos los usuarios");
        } else {
            res.status(200).json(usuarios);
        }
    });
}

//Es necesario exportar todos los métodos que quieran ser utilizados desde rutas
module.exports = { createUser, getAllUsers, deleteUser, getUserById, updateUserById, doLogin };