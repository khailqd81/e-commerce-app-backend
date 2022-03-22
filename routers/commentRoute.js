const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authJwt = require('../middlewares/authJwt');

router.get('/', commentController.getComment);
router.post('/add', authJwt.authUser, commentController.addComment);
module.exports = router;
