const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password
  });

  try {
    const registeredUser = await User.register(newUser, password);
    console.log('已儲存使用者：', registeredUser);

    req.login(registeredUser, (err) => {
      if (err) {
        res.status(500).json({ error: '發生錯誤，請稍後再試。' });
      } else {
        req.session.username = username;
        console.log('Username saved in session:', req.session.username);

        req.session.save((err) => {
          if (err) {
            res.status(500).json({ error: '發生錯誤，請稍後再試。' });
          } else {
            res.json({ redirect: '/home', username: username });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: '發生錯誤，請稍後再試。' });
  }
};

module.exports.login = (req, res) => {
  const { username } = req.body;
  const successMessage = 'welcome back! ${username}';
  const redirectUrl = req.session.returnTo || '/home';
  delete req.session.returnTo;

  res.json({ successMessage, redirectUrl, username });
};

module.exports.logout = (req, res) => {
  req.logout();
  res.json({redirect: '/login'})
}



