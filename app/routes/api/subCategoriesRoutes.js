const router = require("express").Router();
const { category } = require("../../controllers/api/subCategoriesControllers");

router.get("/subCategories/category/:id", category);

module.exports = router;
