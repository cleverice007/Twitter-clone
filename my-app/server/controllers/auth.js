const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; 


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
    const userId = decoded.user_id;

    // 從請求中提取圖像和介紹
    const profileImagePath = req.files['profileImage'][0].path;
    const backgroundImagePath = req.files['backgroundImage'][0].path;
    const introduction = req.body.introduction;

    // 找到並更新對應的用戶
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: profileImagePath, backgroundImage: backgroundImagePath, introduction },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};


// 獲取用戶個人資料
module.exports.getProfile = async (req, res) => {
  try {
    // 從請求標頭中檢索令牌，並解碼以獲取用戶ID
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user_id; // 取得目前登入的用戶ID

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 將用戶的個人資料傳回
    return res.status(200).json({
      profileImage: user.profileImage,
      backgroundImage: user.backgroundImage,
      introduction: user.introduction
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};
