const {createCategory,getOneCateogry,getAllCategories, deleteCategory, updateCategory} = require("../Controllers/categoryController");
const {createCategoryValidator, deleteCategoryValidator, updateCategoryValidator} = require("../utils/vaildators/CategoryVaildators");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();

router
  .route("/")
  .post(uploadPhoto.single("image"), createCategoryValidator, createCategory)
  .get(getAllCategories);

router.route("/:slug").get(getOneCateogry);

router.route("/:id")
.delete(deleteCategoryValidator , deleteCategory)
.put(uploadPhoto.single("image"),updateCategoryValidator , updateCategory)

module.exports = router;
