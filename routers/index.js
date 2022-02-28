const express = require('express')
const router = express.Router();
const productRoute = require('./productRoute');
const categoryRoute = require('./categoryRoute');

router.use('/products',productRoute);
router.use('/category',categoryRoute);
module.exports = router;
