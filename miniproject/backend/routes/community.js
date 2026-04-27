const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const auth = require('../middleware/auth');

router.get('/', communityController.getAllPosts);
router.post('/', auth, communityController.createPost);
router.post('/:id/like', communityController.likePost); // Can be public or protected

module.exports = router;
