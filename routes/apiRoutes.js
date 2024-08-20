const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Example: Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User],
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Additional API routes here...

module.exports = router;