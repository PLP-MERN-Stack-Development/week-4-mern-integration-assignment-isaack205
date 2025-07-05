const Post = require('../models/Post');

const authorizePost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    // Allow if user is author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: "Not authorized" });
    }
    next();
};

module.exports = authorizePost;