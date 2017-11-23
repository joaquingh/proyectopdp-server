var express = require('express');
var router = express.Router();
var FavController = require('../controllers/favorite');


router.post('/create', FavController.createFavorite);
router.get('/getAll', FavController.getAllFavorites);
router.put('/delete', FavController.deleteFavorite);
router.get('/get/:id', FavController.getFavoriteById);
router.put('/update/:id', FavController.updateFavoriteById);
router.get('/getByUser/:id', FavController.getFavoritesByUserId);

module.exports = router;