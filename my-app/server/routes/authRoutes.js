
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Tweet = require('../models/tweet');
const authControllers = require('../controllers/auth');
const passport = require('passport');

// 註冊
router.post('/register', authControllers.register);

//登入
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authControllers.login);


//登出
router.get('/logout',authControllers.logout)

//更新個人資料
router.put('/updateprofile', authControllers.updateProfile);



module.exports = router;

