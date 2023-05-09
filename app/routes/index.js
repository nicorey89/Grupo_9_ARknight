const express = require('express');
const router = express.Router();
const controller = require ("../controllers/indexController");

/* GET home page. */
router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/categoria', controller.categoria);
router.get('/categoria/:id', controller.categorias);


module.exports = router;
