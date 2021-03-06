const express = require('express')
const router = express.Router();
const accountController = require('../controllers/accountController');
const authJwt = require('../middlewares/authJwt');

router.post('/signup', accountController.signup);
router.post('/signin', accountController.signin);
router.get('/is-signin', accountController.isSignin);
router.get('/id', authJwt.authUser, accountController.getUserById);
router.delete('/del', authJwt.authUser,authJwt.isAdmin, accountController.delUser);
router.patch('/block', authJwt.authUser,authJwt.isAdmin, accountController.blockUser);
router.get('/info', authJwt.authUser,authJwt.isAdmin, accountController.getUserInfoByAdmin);
router.get('/', authJwt.authUser, authJwt.isAdmin, accountController.getAllUsers);
module.exports = router;