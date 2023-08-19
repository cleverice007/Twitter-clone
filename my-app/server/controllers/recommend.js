const Tweet = require('../models/tweet');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

module.exports.recommendUsers = async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.user_id; // 取得目前登入的用戶ID
  
      // 查詢目前使用者的資訊，包括正在追蹤的人和他們的貼文
      const currentUser = await User.findById(userId)
        .populate('following', 'username followers')
        .populate({
          path: 'tweets',
          populate: {
            path: 'author',
            select: 'username'
          }
        });
  
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // 排序追蹤的人根據追蹤者人數
      const sortedFollowing = currentUser.following.sort((a, b) => b.followers.length - a.followers.length);
  
      // 取出排序後的追蹤的人的貼文
      const followingTweets = [];
      sortedFollowing.forEach(user => {
        followingTweets.push(...user.tweets);
      });
  
      // 根據貼文的作者，計算每個使用者的推薦指數
      const userRecommendations = {};
      followingTweets.forEach(tweet => {
        const authorId = tweet.author._id.toString();
        if (authorId !== userId) {
          if (!userRecommendations[authorId]) {
            userRecommendations[authorId] = 1;
          } else {
            userRecommendations[authorId]++;
          }
        }
      });
  
      // 將推薦指數降序排序
      const sortedRecommendations = Object.keys(userRecommendations)
        .sort((a, b) => userRecommendations[b] - userRecommendations[a]);
  
      // 查詢每個推薦使用者的資訊
      const recommendedUsers = await User.find({ _id: { $in: sortedRecommendations } }, 'username profileImage');
  
      res.json({ recommendedUsers });
    } catch (error) {
      console.error('Error while recommending users:', error);
      res.status(500).json({ message: 'Failed to recommend users', error: error.message });
    }
  };
  