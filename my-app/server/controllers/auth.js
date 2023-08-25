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
  res.json({ redirect: '/login' })
}



// 更新用戶個人資料
module.exports.updateProfile = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user_id; // 取得目前登入的用戶ID

    // 從請求主體中提取表單數據
    const { profileImage, backgroundImage, introduction } = req.body;

    // 找到並更新對應的用戶
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage, backgroundImage, introduction },
      { new: true }     // 返回更新後的用戶
    );

    // 如果找不到用戶，則返回錯誤
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};

