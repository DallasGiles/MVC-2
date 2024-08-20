const router = require('express').Router();
const { Post, User } = require('../models');
const { authMiddleware } = require('../config/auth');

// Render homepage with all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [User],
    });

    res.render('home', {
      posts: posts.map(post => post.get({ plain: true })),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render single post page
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [User, { model: Comment, include: [User] }],
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.render('post', {
      post: post.get({ plain: true }),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the dashboard
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

// Render dashboard page (protected route)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User],
    });

    res.render('dashboard', {
      posts: userPosts.map(post => post.get({ plain: true })),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render create new post page (protected route)
router.get('/dashboard/new', authMiddleware, (req, res) => {
  res.render('new-post', {
    loggedIn: req.session.loggedIn,
  });
});

// Render edit post page (protected route)
router.get('/dashboard/edit/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [User],
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.render('edit-post', {
      post: post.get({ plain: true }),
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;