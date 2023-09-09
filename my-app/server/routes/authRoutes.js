
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');
const authControllers = require('../controllers/auth');
const passport = require('passport');

const multer = require('multer');
const path = require('path');

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multerS3 = require('multer-s3');



const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'twitter-clone-mason',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

const uploadFields = upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }]);

// 註冊
router.post('/register', authControllers.register);

//登入
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authControllers.login);


//登出
router.get('/logout',authControllers.logout)

//更新個人資料
router.put('/updateprofile', uploadFields, authControllers.updateProfile);


//獲取個人資料
router.get('/profile', authControllers.getProfile);

// 跟隨、取消跟隨用戶
router.put('/:userId/follow', authControllers.followUnfollowUser);

// 獲取用戶的追蹤中用戶資料
router.get('/followingProfile', authControllers.getOtherUserInfo);


module.exports = router;

