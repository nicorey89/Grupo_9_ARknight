const express = require('express');
const router = express.Router();

const productController = require('../controllers/productsController')

/*** GET ALL PRODUCT ***/
router.get('/', productController.index);

/** GET A ONE PRODUCT **/

router.get('/productDetail/:id', productController.pDetail);

/** GET A PRODUCT CART**/
router.get('/productCard', productController.pCard);

module.exports = router;