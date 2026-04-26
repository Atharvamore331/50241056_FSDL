const { CommunityPost } = require('../models');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.findAll({ order: [['createdAt', 'DESC']] });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const author = req.user.name || 'Anonymous Eco Warrior'; // Wait, we need to get user's name

  try {
    // Fetch user to get name
    const { User } = require('../models');
    const user = await User.findByPk(req.user.id);
    
    const newPost = await CommunityPost.create({
      author: user ? user.name : author,
      title,
      content,
      category,
    });
    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
