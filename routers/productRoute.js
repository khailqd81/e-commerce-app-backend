const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
router.get('/id',productController.getOneProductById);
router.get('/search',productController.getProductsByName);
router.use('/:slug',productController.getByType);
router.get('/',productController.getAll);
module.exports = router;