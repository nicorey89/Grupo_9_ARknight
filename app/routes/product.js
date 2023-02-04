const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController')


/*** GET ALL PRODUCT ***/
router.get('/', productController.index);

/** GET A ONE PRODUCT **/
router.get('/productDetail', productController.pDetail);

/** GET A PRODUCT CART**/
router.get('/productCard', productController.pCard);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productController.create);
router.post('/', productController.store); 


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id', productController.update);

module.exports = router;