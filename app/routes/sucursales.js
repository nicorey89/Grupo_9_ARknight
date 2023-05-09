const express = require('express');
const router = express.Router();
const controller = require ("../controllers/sucursalesController");

/* GET home page. */
router.get('/', controller.index);
router.get('/:id', controller.detail);


module.exports = router;
