const propertyRouter = require("../controllers/Property");
const upload = require("../middleware/multer");
const express = require("express");
const router = express.Router(); 

router.post("/add", propertyRouter.add);
router.get("/" ,  propertyRouter.listings);

module.exports = router;