const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // 自訂的密鑰，請保持安全

module.exports.register = async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password
  });

  try {
    const registeredUser = await User.register(newUser, password);
    console.log('已儲存使用者：', registeredUser);

    const token = jwt.sign({ user_id: registeredUser._id }, secretKey);

    res.json({ redirect: '/profile', token, username: registeredUser.username }); // 返回使用者名稱
  } catch (err) {
    res.status(500).json({ error: '發生錯誤，請稍後再試。' });
  }
};

module.exports.login = (req, res) => {
  const { username } = req.body;
  const successMessage = `welcome back! ${username}`;

  const token = jwt.sign({ user_id: req.user._id }, secretKey);

  res.json({ successMessage, token, username }); // 返回使用者名稱
};



module.exports.logout = (req, res) => {
  req.logout();
  res.json({redirect: '/login'})
}



