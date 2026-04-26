const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const auth = require('../middleware/auth');

router.get('/', campaignController.getAllCampaigns);
router.post('/', auth, campaignController.createCampaign);
router.post('/:id/join', auth, campaignController.joinCampaign);


module.exports = router;
