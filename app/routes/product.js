const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController')


/*** GET  PRODUCT ***/
router.get('/productDetail', productController.pDetail);
router.get('/productCard', productController.pCard);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productController.create);
//router.post('/', productsController.store); 


/*** EDIT ONE PRODUCT ***/ 
//router.get('/edit/:id', productsController.edit); 
//router.put('/edit/:id', productsController.update);

module.exports = router;