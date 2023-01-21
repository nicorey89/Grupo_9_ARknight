const express = require('express');
const router = express.Router();
const controller = require ("../controllers/indexController");

/* GET home page. */
router.get('/', controller.index);
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/productDetail', controller.pDetail);
router.get('/productCard', controller.pCard);

module.exports = router;
