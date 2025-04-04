const { createSubcategory, getAllSubcategory, getOneSubcategory, deleteSubcategory, updateSubcategory } = require("../Controllers/subcategoryController");
const uploadPhoto = require("../middlewares/multerConfig");
const {createSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator} = require("../utils/vaildators/SubcategoryVaildators");
const router = require("express").Router();



router
  .route("/")
  .post(uploadPhoto.single("image"),createSubCategoryValidator, createSubcategory)
  .get(getAllSubcategory)


router
  .route("/:slug")
  .get(getOneSubcategory)



router
  .route("/:id")
  .delete(deleteSubCategoryValidator , deleteSubcategory)
  .put(uploadPhoto.single("image") , updateSubCategoryValidator , updateSubcategory)







module.exports = router;