const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    console.log('Blog created:', blog);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    console.log('Blog created:', blog);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};