const Tweet = require('../models/tweet');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

module.exports.recommendUsers = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.user_id; // 取得目前登入的用戶ID
  
      // 查詢 followers 最多的前十名用戶（排除自己）
      const recommendedUsers = await User.find({ _id: { $ne: userId } }, 'username profileImage followers')
        .sort({ followers: -1 })
        .limit(10);
  
      res.json({ recommendedUsers });
    } catch (error) {
      console.error('Error while recommending users:', error);
      res.status(500).json({ message: 'Failed to recommend users', error: error.message });
    }
  };
  