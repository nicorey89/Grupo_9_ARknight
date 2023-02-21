const express = require('express');
const router = express.Router();

const {uploadFile} = require('../middleware/upload')

const productController = require('../controllers/productsController')



/*** GET ALL PRODUCT ***/
router.get('/', productController.index);

/** GET A ONE PRODUCT **/
router.get('/productDetail/:id', productController.pDetail);


/** GET A PRODUCT CART**/
router.get('/productCard', productController.pCard);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productController.create);
router.post('/', uploadFile.single('imagen'), productController.store); 


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id', productController.update);

/*** DETAIL ONE PRODUCT ***/ 
router.detele('/detele/:id', productController.destroy);

module.exports = router;