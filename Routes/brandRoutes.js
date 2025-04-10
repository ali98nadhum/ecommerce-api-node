const uploadPhoto = require("../middlewares/multerConfig");
const { createBrand, getAllBrands, getOneBrand } = require("../Controllers/BrandController");
const AuthService = require("../utils/token/AuthService");
const { createBrandValidator } = require("../utils/vaildators/brandVaildators");
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


module.exports = router;
