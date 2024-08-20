const router = require('express').Router();
const { Post, User } = require('../models');
const { authMiddleware } = require('../config/auth');

// Render homepage with posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User],
    });

    res.render('home', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render dashboard (protected route)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: { userId: req.session.userId },
    });

    res.render('dashboard', {
      posts: userPosts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Additional HTML routes here...

module.exports = router;