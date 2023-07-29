const mongoose = require('mongoose');

// 定義用戶模型
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImage: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
});

// 創建用戶模型
const User = mongoose.model('User', userSchema);

// 導出用戶模型
module.exports = User;



