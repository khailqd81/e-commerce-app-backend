const { Router } = require('express');
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get("/id/:slug",categoryController.getCategoryById);
router.get("/:slug",categoryController.getProductsByCategory);
router.get("/",categoryController.getAll);

module.exports = router;