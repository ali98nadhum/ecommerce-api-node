const { createProduct, getOneProduct, getAllProduct, deleteProduct, updateProduct } = require("../Controllers/ProductController");
const {createProductValidator, updateProductValidator, deleteProductValidator} = require("../utils/vaildators/ProductVaildators");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();
const AuthService = require("../utils/token/AuthService");







router
  .route("/")
  .post(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    uploadPhoto.single("image"),
    createProductValidator,
    createProduct
  )
  .get(getAllProduct);

router.route("/:slug").get(getOneProduct);

router
  .route("/:id")
  .delete(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    deleteProductValidator,
    deleteProduct
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("superAdmin", "admin"),
    uploadPhoto.single("image"),
    updateProductValidator,
    updateProduct
  );

module.exports = router;
