const { createCategory } = require("../Controllers/categoryController");
const router = require("express").Router();
const upload = require("../middlewares/multerConfig")



router.route("/")
.post(upload.single("image"),createCategory)




module.exports = router;