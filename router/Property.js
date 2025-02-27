const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/Property');

// Routes
router.get('/', propertyController.listings);
router.post('/add', propertyController.add);
router.put('/:id', propertyController.edit);
router.get('/:id', propertyController.show);

module.exports = router;