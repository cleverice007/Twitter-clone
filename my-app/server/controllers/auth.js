const User = require('../models/user');

module.exports.register = async (req, res) => {
    const { username, password } = req.body;
  
    const newUser = new User({
      username,
      password
    });
  
    try {
      const savedUser = await newUser.save();
      console.log('已儲存使用者：', savedUser);
  
      req.flash('success', '註冊成功！');
      req.session.isRegistered = true; // 設定 session 變數
  
      res.redirect('http://localhost:3000/home');
    } catch (err) {
      req.flash('error', err.message);
      res.status(500).json({ error: '發生錯誤，請稍後再試。' });
    }
  };
  
  module.exports.getFlashMessage = (req, res) => {
    if (req.session.isRegistered) {
      const successMessage = req.flash('success');
      req.session.isRegistered = false; // 重置 session 變數
      res.json({ successMessage });
    } else {
      res.json({ successMessage: [] });
    }
  };
  