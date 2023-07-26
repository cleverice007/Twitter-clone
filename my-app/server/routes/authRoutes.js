
const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

// 註冊
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    const newUser = new User({
      username,
      password
    });
  
    try {
      const savedUser = await newUser.save();
      console.log('已儲存使用者：', savedUser);
  
      res.redirect('http://localhost:3000/home'); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: '發生錯誤，請稍後再試。' });
    }
  });
    
  module.exports = router;
  
