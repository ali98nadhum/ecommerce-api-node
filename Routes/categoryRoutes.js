const { createCategory } = require("../Controllers/categoryController");

const router = require("express").Router();



router.route("/")
.post(createCategory)




module.exports = router;