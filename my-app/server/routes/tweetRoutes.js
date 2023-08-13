const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');

const { getTweets, createTweet } = require('../controllers/tweet');  // 引入controllers目錄中的tweet.js裡的函數

// 設置相對應的路由
router.get('/getTweets', getTweets);  // 獲取貼文的路由
router.post('/createTweet', createTweet);  // 創建新貼文的路由

module.exports = router;
