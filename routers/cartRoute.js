const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getAll);
router.post('/add', cartController.addProduct);
router.patch('/update', cartController.updateProduct);
router.delete('/remove', cartController.removeProduct);

module.exports = router;
