const { Action, User } = require('../models');

exports.getAllActions = async (req, res) => {
  try {
    const actions = await Action.findAll();
    res.json(actions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.completeAction = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const action = await Action.findByPk(req.params.id);

    if (!action) {
      return res.status(404).json({ msg: 'Action not found' });
    }

    const hasCompleted = await user.hasCompletedAction(action);

    if (hasCompleted) {
      await user.removeCompletedAction(action);
      user.points = Math.max(0, user.points - action.points);
      await user.save();
      return res.json({ completed: false, points: user.points, msg: 'Action marked as incomplete' });
    } else {
      await user.addCompletedAction(action);
      user.points += action.points;
      await user.save();
      return res.json({ completed: true, points: user.points, msg: 'Action completed! Points earned.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createAction = async (req, res) => {
  const { title, difficulty, impact, points } = req.body;
  try {
    const newAction = await Action.create({
      title,
      difficulty,
      impact,
      points
    });
    res.json(newAction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

