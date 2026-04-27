const { Campaign, User } = require('../models');

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll();
    res.json(campaigns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.joinCampaign = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const campaign = await Campaign.findByPk(req.params.id);

    if (!campaign) {
      return res.status(404).json({ msg: 'Campaign not found' });
    }

    const hasJoined = await user.hasJoinedCampaign(campaign);

    if (hasJoined) {
      await user.removeJoinedCampaign(campaign);
      campaign.registered = Math.max(0, campaign.registered - 1);
      await campaign.save();
      return res.json({ joined: false, msg: 'Unregistered from campaign' });
    } else {
      await user.addJoinedCampaign(campaign);
      campaign.registered += 1;
      await campaign.save();
      return res.json({ joined: true, msg: 'Registered for campaign successfully' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createCampaign = async (req, res) => {
  const { title, date, location, type } = req.body;
  try {
    const newCampaign = await Campaign.create({
      title,
      date,
      location,
      type,
      registered: 0
    });
    res.json(newCampaign);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

