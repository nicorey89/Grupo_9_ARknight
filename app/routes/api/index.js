const express = require("express");
const router = express.Router();
const { list, detail, store} = require("../../controllers/api/categoriesController");

router
    .get("/categoria", list)
    .get("/categoria/:id", detail)
//    .post("/categoria/create", store);

module.exports = router;