const { createCategory, getOneCateogry } = require("../Controllers/categoryController");
const router = require("express").Router();
const uploadPhoto = require("../middlewares/multerConfig")



router.route("/")
.post(uploadPhoto.single("image"),createCategory)

router.route("/:slug")
.get(getOneCateogry)




module.exports = router;