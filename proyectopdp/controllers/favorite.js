/*

Controladora de Usuario

*/
var Favorito = require('../models/favorite');

/**
 * Crea un usuario 
 */
var createFavorite = function(req, res) {

    var unFavorito = new Favorito(req.body);

    unFavorito.save(function(err, favoritoSalvado) {
        if (err) {
            console.log("Error al guardar un favorito:" + err);
            res.status(400).end();
        } else {

            res.status(200).json(favoritoSalvado);
        }
    });


}
var getFavoritesByUserId = function(req, res){
    Favorito.find({user_id:req.params.id}, function(err, favoritos){
        if(err){
            res.status(400).end();
        }else{
            res.status(200).json(favoritos);
        }
    });
}
var getFavoriteById = function(req, res) {

    Favorito.findById(req.params.id, function(err, favorito) {
        if (err) {
            console.log(err);
        } else {
            res.send(favorito);
        }

    })
}
var updateFavoriteById = function(req, res) {
    console.log(req.body);
    Favorito.findByIdAndUpdate(eq.params.id, req.body, function(err, favorito) {
        if (err) {
            console.log(err);
        } else {
            res.send(favorito);
        }

    })
}
var deleteFavorite = function(req, res) {

    Favorito.findByIdAndRemove(req.body.eliminar, function(err, favoritoEliminado) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).end();
        }
    })
}
var getAllFavorites = function(req, res) {
    Favorito.find(function(err, favorito) {
        if (err) {
            console.log("Error al traer todos los favoritos");
        } else {
            res.status(200).json(favorito);
        }
    });
}

//Es necesario exportar todos los métodos que quieran ser utilizados desde rutas
module.exports = { createFavorite, getAllFavorites, deleteFavorite, getFavoriteById, updateFavoriteById, getFavoritesByUserId };