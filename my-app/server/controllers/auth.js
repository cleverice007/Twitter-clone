const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password
  });

  try {
    const savedUser = await newUser.save();
    console.log('已儲存使用者：', savedUser);

    req.session.username = username; 
    console.log('Username saved in session:', req.session.username);

    req.session.save((err) => {
      if (err) {
        res.status(500).json({ error: '發生錯誤，請稍後再試。' });
      } else {
        res.json({ redirect: '/home', username: username }); 
      }
    });
  } catch (err) {
    res.status(500).json({ error: '發生錯誤，請稍後再試。' });
  }
};





