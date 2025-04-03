const { createSubcategory } = require("../Controllers/subcategoryController");
const uploadPhoto = require("../middlewares/multerConfig");
const router = require("express").Router();



router
  .route("/")
  .post(uploadPhoto.single("image"), createSubcategory)







module.exports = router;