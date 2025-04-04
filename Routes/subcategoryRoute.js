const { createSubcategory, getAllSubcategory, getOneSubcategory } = require("../Controllers/subcategoryController");
const uploadPhoto = require("../middlewares/multerConfig");
const {createSubCategoryValidator} = require("../utils/vaildators/SubcategoryVaildators");
const router = require("express").Router();



router
  .route("/")
  .post(uploadPhoto.single("image"),createSubCategoryValidator, createSubcategory)
  .get(getAllSubcategory)


router
  .route("/:slug")
  .get(getOneSubcategory)







module.exports = router;