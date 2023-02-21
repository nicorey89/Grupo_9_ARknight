const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController');



router.get('/login', controller.login);


router.get('/register', controller.register);
router.post("/", controller.crear)

router.get('/adminProducts/:id', controller.pAdmit);



module.exports = router
