const { createProduct } = require("../Controllers/ProductController");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();

router
  .route("/")
  .post(uploadPhoto.single("image") , createProduct)




module.exports = router;
