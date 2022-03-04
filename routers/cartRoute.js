const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getAll);
router.post('/add', cartController.addProduct);
router.post('/update', cartController.updateProduct);

module.exports = router;
