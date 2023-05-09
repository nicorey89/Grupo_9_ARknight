const express = require("express");
const router = express.Router();
const { list, detail, listSubCat} = require("../../controllers/api/categoriesController");

router
    .get("/categoria", list)
    .get("/categoria/:id", detail)
    .get("/subcategorias", listSubCat)

module.exports = router;