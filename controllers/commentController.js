const { Comment } = require('../models');

// Get all comments for a post
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: ['User'], // Assuming you have a User model associated
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new comment
const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      userId: req.session.userId,
      postId: req.params.postId,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!comment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllComments,
  createComment,
  deleteComment,
};