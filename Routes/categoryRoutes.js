const {createCategory,getOneCateogry,getAllCategories,deleteCategory,updateCategory} = require("../Controllers/categoryController");
const {createCategoryValidator,deleteCategoryValidator, updateCategoryValidator,} = require("../utils/vaildators/CategoryVaildators");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();
const AuthService = require("../utils/token/AuthService");

router
  .route("/")
  .post(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    uploadPhoto.single("image"),
    createCategoryValidator,
    createCategory
  )
  .get(getAllCategories);

router.route("/:slug").get(getOneCateogry);

router
  .route("/:id")
  .delete(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    deleteCategoryValidator,
    deleteCategory
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    uploadPhoto.single("image"),
    updateCategoryValidator,
    updateCategory
  );

module.exports = router;
