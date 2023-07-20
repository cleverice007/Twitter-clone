const mongoose = require('mongoose');

// 定義用戶模型
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 其他用戶屬性...
});

// 創建用戶模型
const User = mongoose.model('User', userSchema);

// 導出用戶模型
module.exports = User;

// Path: server/models/index.js


