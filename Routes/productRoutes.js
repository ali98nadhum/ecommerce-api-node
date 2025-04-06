const { createProduct, getOneProduct, getAllProduct } = require("../Controllers/ProductController");
const {createProductValidator} = require("../utils/vaildators/ProductVaildators");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();

router
  .route("/")
  .post(uploadPhoto.single("image"),createProductValidator , createProduct)
  .get(getAllProduct)


router
  .route("/:slug")
  .get(getOneProduct)




module.exports = router;
