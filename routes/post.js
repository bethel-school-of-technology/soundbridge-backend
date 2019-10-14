const Router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Get all posts
Router.get('/get-posts', async (req, res) => {
    const allPosts = await Post.find();
    res.send(allPosts);
});

// Get all user posts
Router.get('/user-posts/:id', async (req, res) => {
    const posts = await Post.find({ userId: req.params.id });
    console.log('who was that')
    res.send(posts);
});

// Create new post
Router.post('/', async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        userName: req.body.userName,
        title: req.body.title,
        body: req.body.body
    })
    try {
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (err) {
        res.send(err);
    }
});

// Get comments for post
Router.get('/get-comments/:postId', async (req, res) => {
    const allComments = await Comment.find({ postId: req.params.postId });
    res.send(allComments);
});

// Create new comment
Router.post('/comment', async (req, res) => {
    const comment = new Comment({
        userId: req.body.userId,
        userName: req.body.userName,
        postId: req.body.postId,
        body: req.body.body
    })
    try {
        const savedComment = await comment.save();
        res.send(saveComment);
    } catch (err) {
        res.send(err);
    }
});


module.exports = Router