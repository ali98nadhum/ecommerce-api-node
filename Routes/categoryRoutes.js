const { createCategory, getOneCateogry, getAllCategories } = require("../Controllers/categoryController");
const router = require("express").Router();
const uploadPhoto = require("../middlewares/multerConfig");
const { createCategoryValidator } = require("../utils/vaildators/CategoryVaildators");



router.route("/")
.post
(
    uploadPhoto.single("image"),
    createCategoryValidator,
    createCategory
)
.get(getAllCategories)


router.route("/:slug")
.get(getOneCateogry)




module.exports = router;