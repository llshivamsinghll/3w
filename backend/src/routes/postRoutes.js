const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
  getPostLikes,
  deleteComment,
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.put('/:id/like', protect, likePost);
router.get('/:id/likes', getPostLikes);
router.post('/:id/comment', protect, addComment);
router.delete('/:id/comment/:commentId', protect, deleteComment);

module.exports = router;
