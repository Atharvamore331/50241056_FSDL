const { News, User } = require('../models');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ order: [['date', 'DESC']] });
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findByPk(req.params.id);
    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createNews = async (req, res) => {
  const { title, category, summary, content, image, url, trending } = req.body;

  try {
    const newNews = await News.create({
      title,
      category,
      summary,
      content,
      image,
      url,
      trending,
    });
    res.json(newNews);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.saveArticle = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const news = await News.findByPk(req.params.id);

    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }

    const hasSaved = await user.hasSavedArticle(news);

    if (hasSaved) {
      await user.removeSavedArticle(news);
      return res.json({ saved: false, msg: 'Article removed from saved' });
    } else {
      await user.addSavedArticle(news);
      return res.json({ saved: true, msg: 'Article saved successfully' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
