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
    req.login(savedUser, err => {
        if (err) return next(err);
        res.redirect('http://localhost:3000/home');
        ;
    })
  } catch (err) {
    req.flash('error', err.message);
    res.status(500).json({ error: '發生錯誤，請稍後再試。' });
  }
};


