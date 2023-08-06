
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authControllers = require('../controllers/auth');
const passport = require('passport');

// 註冊
router.post('/register', authControllers.register);

//登入
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), authControllers.login);


//登出
router.get('/logout',authControllers.logout)



module.exports = router;

