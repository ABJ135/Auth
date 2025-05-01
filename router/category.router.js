const express = require("express");
const router = express.Router();
const categoryController = require("../controller/category.controller");
const auth = require("../auth/jetAuth"); 

router.post("/createCategory", auth, categoryController.createCategory);
router.get("/getCategories", auth, categoryController.getAllCategories);
router.get("/getCategory/:id", auth, categoryController.getCategoryById);
router.put("/updateCategory/:id", auth, categoryController.updateCategory);
router.delete("/deleteCategory/:id", auth, categoryController.deleteCategory);

module.exports = router;
