const User = require('../models/user');
const Tweet = require('../models/tweet');
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

  
    const profileImage = req.files['profileImage'][0].location; // 從 S3 獲得的 URL
    const backgroundImage = req.files['backgroundImage'][0].location; // 從 S3 獲得的 URL

    const updateFields = {
      profileImage,
      backgroundImage,
      introduction: req.body.introduction
    };


    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
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
    const followersIds = user.followers.map(follower => follower.toString());
    const followingIds = user.following.map(follow => follow.toString());

    // 將用戶的個人資料傳回
    return res.status(200).json({
      profileImage: user.profileImage,
      backgroundImage: user.backgroundImage,
      introduction: user.introduction,
      followers:  followersIds ,
      following: followingIds
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};


// 跟隨、取消跟隨用戶

module.exports.followUnfollowUser = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user_id; // 取得目前登入的用戶ID

    const user = await User.findById(userId);    
    const followId = req.params.userId; // 要跟隨/取消跟隨的用戶的 ID
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // 檢查要跟隨/取消跟隨的用戶是否存在
    const followUser = await User.findById(followId);
    if (!followUser) {
      return res.status(404).json({ message: 'User to follow/unfollow not found' });
    }

    // 檢查 followId 是否已經在 following 陣列中
    const index = user.following.indexOf(followId);
    
    if (index > -1) {
      // 已經跟隨，所以取消跟隨
      user.following.splice(index, 1);
      followUser.followers.splice(followUser.followers.indexOf(userId), 1);
    } else {
      // 還未跟隨，所以新增
      user.following.push(followId);
      followUser.followers.push(userId);
    }
    
    // 保存變更
    await user.save();
    await followUser.save();
    
    return res.status(200).json({ message: 'Follow/Unfollow successful', following: user.following });
  } catch (error) {
    console.error('Error in follow/unfollow:', error);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
};

module.exports.getOtherUserInfo = async (req, res) => {
  try {
    // Token 解析
    const token = req.header('Authorization').replace('Bearer ', '');
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (e) {
      return res.status(401).json({ message: 'Invalid Token', error: e.toString() });
    }
    
    const userId = decoded.user_id;

    // 查找用戶
    let user;
    try {
      user = await User.findById(userId);
    } catch (e) {
      console.error('Error finding user:', e);
      return res.status(500).json({ message: 'Error finding user', error: e.toString() });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 查找用戶的追蹤
    let followingUsers;
    try {
      followingUsers = await User.find({ _id: { $in: user.following } });
    } catch (e) {
      console.error('Error finding following users:', e);
      return res.status(500).json({ message: 'Error finding following users', error: e.toString() });
    }

    const followingUsersInfo = await Promise.all(followingUsers.map(async (followingUser) => {
      let userTweets;
      try {
        // 查找 tweets
        userTweets = await Tweet.find({ author: followingUser._id })
          .populate({
            path: 'author',
            select: 'username'
          })
          .populate({
            path: 'likes',
            select: 'username'
          })
          .populate({
            path: 'comments.userId',
            select: 'username'
          });
      } catch (e) {
        console.error('Error finding tweets for user:', e);
      }

      const userTweetsInfo = userTweets.map((tweet) => ({
        author: tweet.author.username,
        content: tweet.content,
        likes: tweet.likes.map(like => like.username),
        comments: tweet.comments.map(comment => ({
          username: comment.userId.username,
          content: comment.content,
          createdAt: comment.createdAt
        }))
      }));

      return {
        profileImage: followingUser.profileImage,
        backgroundImage: followingUser.backgroundImage,
        username: followingUser.username,
        introduction: followingUser.introduction,
        followers: followingUser.followers,
        following: followingUser.following,
        tweets: userTweetsInfo
      };
    }));

    res.json({ followingUsers: followingUsersInfo });
  } catch (error) {
    console.error('General error fetching user info:', error);
    res.status(500).json({ message: 'Server error', error: error.toString() });
  }
};

