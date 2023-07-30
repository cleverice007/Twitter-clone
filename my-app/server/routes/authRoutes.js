
const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const authController = require('../controllers/auth');

// 註冊
router.post('/register', authController.register);

    
  module.exports = router;
  
