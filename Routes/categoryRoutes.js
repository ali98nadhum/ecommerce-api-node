const { createCategory } = require("../Controllers/categoryController");
const router = require("express").Router();
const uploadPhoto = require("../middlewares/multerConfig")



router.route("/")
.post(uploadPhoto.single("image"),createCategory)




module.exports = router;