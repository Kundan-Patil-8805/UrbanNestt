const propertyRouter = require("../controllers/Property");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer")
// Add a property
router.post("/add", upload.single("images"),propertyRouter.add);

// Fetch all property listings
router.get("/", propertyRouter.listings);

// Edit a property
router.put("/:id", propertyRouter.edit);
//show a  property
router.get("/:id", propertyRouter.show);

module.exports = router;
