var express = require('express');
var router = express.Router();
var MenuController = require('../controllers/menu');


router.post('/create', MenuController.createMenu);
router.get('/getAll', MenuController.getAllMenus);
router.put('/delete', MenuController.deleteMenu);
router.get('/get/:id', MenuController.getMenuById);
router.put('/update/:id', MenuController.updateMenuById);

module.exports = router;