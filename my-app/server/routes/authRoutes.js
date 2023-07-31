
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authControllers = require('../controllers/auth');

// 註冊
router.post('/register', authControllers.register);

// 取得註冊頁面的flash message
router.get('/flash-message', authControllers.getFlashMessage);

module.exports = router;

