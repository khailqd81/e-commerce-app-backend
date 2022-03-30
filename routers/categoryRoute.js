const { Router } = require('express');
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
// Lấy thông tin category
router.get("/id/:slug", categoryController.getCategoryById);
// Lấy danh sách sản phẩm theo category
router.get("/:slug", categoryController.getProductsByCategory);
router.get("/", categoryController.getAll);

module.exports = router;