const Router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');

Router.get('/user-posts/:id', async (req, res) => {
    const posts = await Post.find({ userId: req.params.id });
    res.send(posts);
});

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

Router.post('/comment', async (req, res) => {
    const comment = new Comment({
        userId: req.body.userId,
        userName: req.body.userName,
        title: req.body.title,
        body: req.body.body
    })
    try {
        const savedComment = await comment.save();
        res.send(req.body);
    } catch (err) {
        res.send(err);
    }
});


module.exports = Router