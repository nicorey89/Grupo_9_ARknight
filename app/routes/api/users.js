const express = require("express");
const router = express.Router();
const { list, detail} = require("../../controllers/api/userController");

router
    .get("/users", list)
    .get("/users/:id", detail)
//    .post("/categoria/create", store);

module.exports = router;