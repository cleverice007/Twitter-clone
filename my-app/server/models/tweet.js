const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    content: String,
    createdAt: { type: Date, default: Date.now } // 新增 createdAt 欄位
  }]
}, { timestamps: true });  // 自動新增createdAt和updatedAt欄位



  const Tweet = mongoose.model('Tweet', tweetSchema);

  module.exports = Tweet;
