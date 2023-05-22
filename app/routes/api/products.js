const express = require("express");
const router = express.Router();
const { list, detail} = require("../../controllers/api/productsController");

router
    .get("/products", list)
    .get("/products/:id", detail)

module.exports = router;