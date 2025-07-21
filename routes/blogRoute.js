const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/allowedRoles');

const {
  createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, addComment
} = require('../controllers/blogController');

router.post('/', auth, requireRole(['admin', 'editor']), createBlog);
router.post('/:id/comments', addComment);

router.get('/', auth, getBlogs);
router.get('/:id',getBlogById);
router.put('/:id',auth, requireRole(['admin', 'editor']), updateBlog);
router.delete('/:id', auth, requireRole(['admin']), deleteBlog);

module.exports = router;