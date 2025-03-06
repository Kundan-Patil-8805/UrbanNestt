const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/Property");
const upload = require("../middleware/multer"); // Use multer middleware

// Add a property with image upload
router.post("/add", upload.single("image"), propertyController.add);

module.exports = router;

// router.post('/add', upload.single('image'), propertyController.add); // Use multer upload middleware
// router.put('/:id', propertyController.edit);
// router.get('/:id', propertyController.show);

// module.exports = router;
