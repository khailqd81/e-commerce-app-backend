const express = require('express')
const router = express.Router();
const accountController = require('../controllers/accountController');
const authJwt = require('../middlewares/authJwt');

router.post('/signup', accountController.signup);
router.post('/signin', accountController.signin);
router.get('/is-signin', accountController.isSignin);
router.get('/id', authJwt.authUser, accountController.getUserById)
module.exports = router;