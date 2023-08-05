
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authControllers = require('../controllers/auth');

// 註冊
router.post('/register', authControllers.register);


module.exports = router;

