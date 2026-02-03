const Post = require('../models/Post');

exports.createPost = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text content',
      });
    }
    
    const post = await Post.create({
      text,
      user: req.user.id,
      userName: req.user.name,
    });
    
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    const feed = posts.map(post => ({
      _id: post._id,
      text: post.text,
      userName: post.userName,
      userId: post.user._id,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
      createdAt: post.createdAt,
    }));
    
    res.status(200).json({
      success: true,
      count: feed.length,
      data: feed,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name email')
      .populate('comments.user', 'name');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    const postData = {
      _id: post._id,
      text: post.text,
      userName: post.userName,
      userId: post.user._id,
      likesCount: post.likes.length,
      likes: post.likes,
      commentsCount: post.comments.length,
      comments: post.comments,
      createdAt: post.createdAt,
    };
    
    res.status(200).json({
      success: true,
      data: postData,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }
    
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }
    
    await post.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    const likeIndex = post.likes.indexOf(req.user.id);
    
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1);
      await post.save();
      
      return res.status(200).json({
        success: true,
        message: 'Post unliked',
        data: {
          likesCount: post.likes.length,
          isLiked: false,
        },
      });
    } else {
      post.likes.push(req.user.id);
      await post.save();
      
      return res.status(200).json({
        success: true,
        message: 'Post liked',
        data: {
          likesCount: post.likes.length,
          isLiked: true,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide comment text',
      });
    }
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    const comment = {
      user: req.user.id,
      userName: req.user.name,
      text,
      createdAt: Date.now(),
    };
    
    post.comments.push(comment);
    await post.save();
    
    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: {
        comment,
        commentsCount: post.comments.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostLikes = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('likes', 'name email');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    res.status(200).json({
      success: true,
      count: post.likes.length,
      data: post.likes,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }
    
    const comment = post.comments.id(req.params.commentId);
    
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }
    
    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment',
      });
    }
    
    comment.deleteOne();
    await post.save();
    
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
