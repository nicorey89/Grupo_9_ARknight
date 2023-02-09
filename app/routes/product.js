const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');



const productController = require('../controllers/productsController')
const storage = multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: (req, file, cb) => {
        cb(null, ('product-' + Date.now() + path.extname(file.originalname)) )
    }
});
const uploadFile = multer({storage});

/*** GET ALL PRODUCT ***/
router.get('/', productController.index);

/** GET A ONE PRODUCT **/
router.get('/productDetail', productController.pDetail);

/** GET A PRODUCT CART**/
router.get('/productCard', productController.pCard);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productController.create);
router.post('/', uploadFile.single('imagen'), productController.store); 


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productController.edit); 
router.put('/edit/:id', productController.update);

module.exports = router;