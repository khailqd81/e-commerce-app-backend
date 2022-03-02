const express = require('express')
const router = express.Router();
const accountController = require('../controllers/accountController')
router.post('/signup', accountController.signup);
router.post('/signin', accountController.signin);

module.exports = router;