const { createProduct, getOneProduct, getAllProduct, deleteProduct, updateProduct } = require("../Controllers/ProductController");
const {createProductValidator, updateProductValidator, deleteProductValidator} = require("../utils/vaildators/ProductVaildators");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();

router
  .route("/")
  .post(uploadPhoto.single("image"),createProductValidator , createProduct)
  .get(getAllProduct)


router
  .route("/:slug")
  .get(getOneProduct)



router
.route("/:id")
.delete(deleteProductValidator,deleteProduct)
.put(uploadPhoto.single("image") , updateProductValidator , updateProduct)




module.exports = router;
