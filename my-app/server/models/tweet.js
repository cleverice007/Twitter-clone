const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, content: String }],
  });

  const Tweet = mongoose.model('Tweet', tweetSchema);

  module.exports = Tweet;
