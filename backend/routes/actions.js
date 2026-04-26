const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');
const auth = require('../middleware/auth');

router.get('/', actionController.getAllActions);
router.post('/', auth, actionController.createAction);
router.post('/:id/complete', auth, actionController.completeAction);


module.exports = router;
