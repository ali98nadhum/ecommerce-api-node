const { createProduct } = require("../Controllers/ProductController");
const {createProductValidator} = require("../utils/vaildators/ProductVaildators");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();

router
  .route("/")
  .post(uploadPhoto.single("image"),createProductValidator , createProduct)




module.exports = router;
