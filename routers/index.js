const express = require('express')
const router = express.Router();
const productRoute = require('./productRoute');

router.use('/products',productRoute);
module.exports = router;
