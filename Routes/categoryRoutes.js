const {createCategory,getOneCateogry,getAllCategories} = require("../Controllers/categoryController");
const {createCategoryValidator} = require("../utils/vaildators/CategoryVaildators");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();

router
  .route("/")
  .post(uploadPhoto.single("image"), createCategoryValidator, createCategory)
  .get(getAllCategories);

router.route("/:slug").get(getOneCateogry);

module.exports = router;
