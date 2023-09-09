
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');
const authControllers = require('../controllers/auth');
const passport = require('passport');

const multer = require('multer');
const path = require('path');

const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'twitter-clone-mason',
    acl: 'public-read', // 設置為 public-read 以讓用戶能夠看到圖片
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // 使用日期作為文件名
    }
  })
});


// 註冊
router.post('/register', authControllers.register);

//登入
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authControllers.login);


//登出
router.get('/logout',authControllers.logout)

//更新個人資料
router.put('/updateprofile', authControllers.updateProfile);


//獲取個人資料
router.get('/profile', authControllers.getProfile);

// 跟隨、取消跟隨用戶
router.put('/:userId/follow', authControllers.followUnfollowUser);

// 獲取用戶的追蹤中用戶資料
router.get('/followingProfile', authControllers.getOtherUserInfo);


module.exports = router;

