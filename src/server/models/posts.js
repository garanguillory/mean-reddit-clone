
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;
var Posts = require('../models/posts');

var PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Array,
    default: []
  },
  showComments: {
    type: Boolean,
    default: false,
  }
});

var Posts = mongoose.model('posts', PostSchema);


module.exports = Posts;