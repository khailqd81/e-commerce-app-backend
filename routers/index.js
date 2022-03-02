const express = require('express')
const router = express.Router();
const productRoute = require('./productRoute');
const categoryRoute = require('./categoryRoute');
const accountRoute = require('./accountRoute');
const cartRoute = require('./cartRoute');
const authJwt = require('../middlewares/authJwt');

router.use('/products', productRoute);
router.use('/category', categoryRoute);
router.use('/account', accountRoute);
router.use('/cart', authJwt.authUser, cartRoute);
module.exports = router;
