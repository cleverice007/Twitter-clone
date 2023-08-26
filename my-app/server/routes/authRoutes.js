
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');
const authControllers = require('../controllers/auth');
const passport = require('passport');

const multer = require('multer');
const path = require('path');

// 設置檔案存儲位置和命名規則
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // 存儲在名為'uploads'的資料夾中
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // 使用當前時間戳和原始檔案擴展名作為檔案名
    }
  });
  

const upload = multer({ storage: storage }); // 你需要在之前定義的存儲設定

// 註冊
router.post('/register', authControllers.register);

//登入
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authControllers.login);


//登出
router.get('/logout',authControllers.logout)

//更新個人資料
router.put('/updateprofile', upload.fields([{ name: 'profileImage' }, { name: 'backgroundImage' }]), authControllers.updateProfile);


//獲取個人資料
router.get('/profile', authControllers.getProfile);

// 跟隨、取消跟隨用戶
router.put('/:userId/follow', authControllers.followUnfollowUser);


module.exports = router;

