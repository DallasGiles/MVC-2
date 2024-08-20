const router = require('express').Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const { authMiddleware } = require('../config/auth');

// Post routes
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', authMiddleware, postController.createPost);
router.put('/posts/:id', authMiddleware, postController.updatePost);
router.delete('/posts/:id', authMiddleware, postController.deletePost);

// Comment routes
router.get('/posts/:postId/comments', commentController.getAllComments);
router.post('/posts/:postId/comments', authMiddleware, commentController.createComment);
router.delete('/comments/:id', authMiddleware, commentController.deleteComment);

// User routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;