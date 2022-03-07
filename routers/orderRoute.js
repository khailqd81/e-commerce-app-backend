const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.get('/', orderController.getAll);
router.post('/add', orderController.add);

module.exports = router;