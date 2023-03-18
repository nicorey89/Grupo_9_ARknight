const express = require("express");
const router = express.Router();



const sessionAdminCheck = require("../middleware/sessionAdminCheck");   

const {index, pAdmit, create,edit , destroy , store , update , listar} = require('../controllers/adminController')
const {uploadFile} = require('../middleware/upload')


/* GET - Index */
router.get("/", sessionAdminCheck ,index);
/* GET - EDIT - ADMIN PRODUCT */

router.get('/products',sessionAdminCheck , listar);
router.get('/adminProducts/:id',sessionAdminCheck ,pAdmit);

/*** CREATE ONE PRODUCT ***/
router.get('/create/', sessionAdminCheck ,create);
router.post('/', uploadFile.single('imagen'), store);
/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', sessionAdminCheck ,edit);
router.put('/edit/:id', uploadFile.single('imagen') , update);
/*** DELETE ONE PRODUCT ***/
router.delete('/:id', destroy)

module.exports = router;