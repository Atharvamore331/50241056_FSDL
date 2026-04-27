const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const auth = require('../middleware/auth');

router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.post('/', auth, newsController.createNews); // Should be admin, but leaving open for now or simple auth
router.post('/:id/save', auth, newsController.saveArticle);

module.exports = router;
