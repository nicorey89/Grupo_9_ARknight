const express = require("express");
const router = express.Router();

const sessionAdminCheck = require("../middleware/sessionAdminCheck");   

const {index, destroyUser, listarUsers, userUpdate, create,edit , destroy , store , update , listar} = require('../controllers/adminController')
const {uploadFile} = require('../middleware/upload')


/* GET - Index */
router.get("/", sessionAdminCheck ,index);
/* GET - EDIT - ADMIN PRODUCT */

router.get('/products',sessionAdminCheck , listar);
router.get('/users',sessionAdminCheck , listarUsers);
router.put('/users/:id', userUpdate);

/*** CREATE ONE PRODUCT ***/
router.get('/create/', sessionAdminCheck ,create);
router.post('/', uploadFile.single('imagen'), store);
/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', sessionAdminCheck ,edit);
router.put('/edit/:id', uploadFile.single('imagen') , update);
/*** DELETE ONE PRODUCT ***/
router.delete('/:id', destroy)
router.delete('/users/:id', destroyUser)

module.exports = router;