const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController')


/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productController.create);


/*** EDIT ONE PRODUCT ***/ 
//router.get('/edit/:id', productsController.edit); 

module.exports = router;