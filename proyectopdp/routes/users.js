var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');


router.post('/create', UserController.createUser);
router.get('/getAll', UserController.getAllUsers);
router.put('/delete', UserController.deleteUser);
router.get('/get/:id', UserController.getUserById);
router.put('/update/:id', UserController.updateUserById);
router.get('/login/:email/:clave', UserController.doLogin);

module.exports = router;