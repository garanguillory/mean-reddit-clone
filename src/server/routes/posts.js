var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Posts = require('../models/posts.js');


// GET ALL posts
router.get('/', function (req, res, next) {
  Posts.find({})
  .then(function(posts) {
    res.status(200).json({
      status: 'success',
      data: posts
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


// ADD NEW post
router.post('/', function (req, res, next) {
  var post = new Posts(req.body);
  post.save()
  .then(function(post) {
    console.log(post);
    res.status(200).json({
      status: 'success',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


// ADD a comment to a post (by id)
router.put('/:id/comment', function (req, res, next) {
  var post_id = req.params.id;
  Posts.findByIdAndUpdate(req.params.id, {$addToSet: {comments: req.body}}, {new:true})
  .then(function(post) {
    console.log(post);
    res.status(200).json({
      status: 'success',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


// DELETE a comment from a post (by id)
router.put('/:id/comment/:userid/delete', function (req, res, next) {
  var post_id = req.params.id; // variables necessary?
  var user_id = req.params.userid; // variables necessary?
  Posts.findByIdAndUpdate(req.params.id, {$pull: {comments: {"user_id": req.params.userid}}}, {new:true})
  .then(function(post) {
    console.log(post);
    res.status(200).json({
      status: 'success',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


// Update a post's vote count (upvote)
router.put('/:id/upvote', function (req, res, next) {
  var post_id = req.params.id;
  console.log('upvote');
  Posts.findByIdAndUpdate(req.params.id, {$inc: {votes: 1}}, {new:true})
  .then(function(post) {
    console.log("post: ", post);
    res.status(200).json({
      status: 'success',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


// Update a post's vote count (downvote)
router.put('/:id/downvote', function (req, res, next) {
  var post_id = req.params.id;
  console.log('downvote');
  Posts.findByIdAndUpdate(req.params.id, {$inc: {votes: -1}}, {new:true})
  .then(function(post) {
    console.log("post: ", post);
    res.status(200).json({
      status: 'success',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


// DELETE a post
router.delete('/:id', function (req, res, next) {
  var post_id = req.params.id; // necessary ???
  Posts.findByIdAndRemove(req.params.id)
  .then(function(post) {
    console.log(post);
    res.status(200).json({
      status: 'success',
      data: post
    });
  })
  .catch(function (err) {
    return next(err);
  });
});


module.exports = router;














