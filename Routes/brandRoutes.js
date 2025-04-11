const uploadPhoto = require("../middlewares/multerConfig");
const { createBrand, getAllBrands, getOneBrand, deleteBrand, updateBrand } = require("../Controllers/BrandController");
const AuthService = require("../utils/token/AuthService");
const { createBrandValidator, deleteBrandValidator, updateBrandValidator } = require("../utils/vaildators/brandVaildators");
const router = require("express").Router();

router
  .route("/")
  .post(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    uploadPhoto.single("image"),
    createBrandValidator,
    createBrand,
  )
  .get(getAllBrands)


  router
  .route("/:slug")
  .get(getOneBrand)


  router
  .route("/:id")
  .delete(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    deleteBrandValidator,
    deleteBrand
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("superAdmin" , "admin"),
    updateBrandValidator,
    updateBrand
  )


module.exports = router;
