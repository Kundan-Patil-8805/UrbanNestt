const propertyRouter = require("../controllers/Property");
const upload = require("../middleware/multer");
const express = require("express");
const router = express.Router(); 

router.post("/add", propertyRouter.add);


module.exports = router;