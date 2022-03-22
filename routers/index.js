const express = require('express')
const router = express.Router();
const productRoute = require('./productRoute');
const categoryRoute = require('./categoryRoute');
const accountRoute = require('./accountRoute');
const commentRoute = require('./commentRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');
const authJwt = require('../middlewares/authJwt');

router.use('/products', productRoute);
router.use('/category', categoryRoute);
router.use('/account', accountRoute);
router.use('/comment', commentRoute);
router.use('/cart', authJwt.authUser, cartRoute);
router.use('/order', authJwt.authUser, orderRoute);
router.get('/is-signin', authJwt.authUser, (req, res, next) => {
    res.status(200).send({
        message: "logged"
    })
});
router.get('/refresh-token', authJwt.handleRefreshToken);
module.exports = router;
