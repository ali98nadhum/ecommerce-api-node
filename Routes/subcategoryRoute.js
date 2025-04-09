
const { createSubcategory, getAllSubcategory, getOneSubcategory, deleteSubcategory, updateSubcategory } = require("../Controllers/subcategoryController");
const uploadPhoto = require("../middlewares/multerConfig");
const {createSubCategoryValidator, deleteSubCategoryValidator, updateSubCategoryValidator} = require("../utils/vaildators/SubcategoryVaildators");
const router = require("express").Router();
const AuthService = require("../utils/token/AuthService");




router
  .route("/")
  .post(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    uploadPhoto.single("image"),
    createSubCategoryValidator,
    createSubcategory
  )
  .get(getAllSubcategory);

router.route("/:slug").get(getOneSubcategory);

router
  .route("/:id")
  .delete(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    deleteSubCategoryValidator,
    deleteSubcategory
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    uploadPhoto.single("image"),
    updateSubCategoryValidator,
    updateSubcategory
  );

module.exports = router;
