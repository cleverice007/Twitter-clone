const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');

const { recommendUsers } = require('../controllers/recommend');

router.get('/recommend-users',  recommendUsers);  // 獲取貼文的路由
