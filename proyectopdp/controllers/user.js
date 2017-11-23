/*

Controladora de Usuario

*/
var User = require('../models/user');
//var bcrypt = require('bcrypt-nodejs');

/**
 * Crea un usuario 
 */
var createUser = function(req, res) {
    
    //var hash = bcrypt.hashSync(req.body.clave);//ENCRIPTO LA CLAVE
    //req.body.clave = hash;//LA GUARDO EN EL BODY
    ////ASUMO QUE LA CLAVE VIENE ENCRIPTADA Y LA GUARDO COMO VIENE
    var unUsuario = new User(req.body);
    User.find({mail:req.body.mail}, function(err, usuarioEncontrado) {
        if (err) {
            res.status(409).end("Error al buscar usuario");
        } else {
            if(usuarioEncontrado != ""){
                res.status(400).end("Email ya registrado!");
            }else{
                unUsuario.save(function(err, usuarioSalvado) {
                if (err) {
                    res.status(409).end("Error al guardar un usuario");
                } else {
                    res.status(200).json(usuarioSalvado);
                }
                });
            }
        }
    });
}
var getUserById = function(req, res) {
    User.findById(req.params.id, function(err, usuario) {
        if (err) {
            console.log(err);
        } else {
            //bcrypt.compareSync("bacon", hash); // true
            res.send(usuario);
        }
    })
}
var doLogin = function(req, res) {    
    User.find({mail:req.params.email}, function(err, usuario) {
        if (err) {
            res.status(401).end("¡Usuario no encontrado!");
        } else {
            //bcrypt.compareSync(clave_digitada, hash); // true = clave correcta
            var usuarioObj = usuario[0];
            if (usuarioObj.clave == req.params.clave)
                res.status(200).send(usuarioObj);
            else
                res.status(401).end("¡Contraseña incorrecta!");
        }
    });
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