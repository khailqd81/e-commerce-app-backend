const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
router.use('/id',productController.getOneProduct);
router.use('/:slug',productController.getByType);
router.use('/',productController.getAll);
module.exports = router;