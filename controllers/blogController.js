const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    console.log('Blog created:', blog);
    res.status(201).json(blog);
  } catch (err) {
  next(err);
}
};

exports.getBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const status = req.query.status;
  const search = req.query.search;
  console.log(`Fetching blogs: page=${page}, limit=${limit}, skip=${skip}`);
  const filter = {};
  if (status) filter.status = status; //
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }
    try {
    const posts = await Blog.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(filter);

    res.json({
      posts,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
  next(err);
}
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
  next(err);
}
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(blog);
  } catch (err) {
  next(err);
}
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
  next(err);
}
};