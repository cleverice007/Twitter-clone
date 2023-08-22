const Tweet = require('../models/tweet');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

module.exports.getTweets = async (req, res) => {
  try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.user_id; // 取得目前登入的用戶ID
      
      // 查詢用戶自己的貼文
      const userTweets = await Tweet.find({ author: userId })
          .populate('author')
          .populate({
              path: 'comments.userId',
              select: 'username'
          })
          .sort({ createdAt: -1 });

      // 獲得用戶的跟隨者ID列表
      const user = await User.findById(userId);
      const followersIds = user.followers;

      // 查詢跟隨者的貼文
      const followersTweets = await Tweet.find({
          author: { $in: followersIds }
      }).populate('author')
      .populate({
          path: 'comments.userId',
          select: 'username'
      })
      .sort({ createdAt: -1 });

      res.json({ userTweets, followersTweets });
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports.getOtherTweets = async (req, res) => {
  try {
    const { userId } = req.params;

    // 查詢特定用戶的貼文
    const otherUserTweets = await Tweet.find({ author: userId })
      .populate('author')
      .populate({
        path: 'comments.userId',
        select: 'username'
      })
      .sort({ createdAt: -1 });

    res.json({ otherUserTweets });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};




module.exports.createTweet = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, secretKey);
        const author = decoded.user_id; // 取得目前登入的用戶ID

        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ message: 'Content is required and should not be empty' });
        }

        const newTweet = new Tweet({
            author,
            content
        });

        const savedTweet = await newTweet.save();

        // 更新用戶模型以包含這條新的貼文
        await User.updateOne(
            { _id: author },
            { $push: { tweets: savedTweet._id } }
        );

        res.json(savedTweet);
    } catch (error) {
        console.error('Error while creating tweet:', error);
        res.status(500).json({ message: 'Failed to create tweet', error: error.message });
    }
};

// 新增評論
module.exports.addComment = async (req, res) => {
  try {
    const { tweetId, content, createdAt } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user_id; // 取得目前登入的用戶ID

    // 尋找該貼文
    const tweet = await Tweet.findById(tweetId).populate('comments.userId', 'username');

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // 新增評論
    tweet.comments.push({ userId, content, createdAt });
    await tweet.save();

    res.json({ message: 'Comment added successfully', comment_username:username });
  } catch (error) {
    console.error('Error while adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};




// 貼文點讚
module.exports.toggleLike = async (req, res) => {
  try {
    const { tweetId } = req.params; 
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user_id; // 取得目前登入的用戶ID

    // 尋找該貼文
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // 檢查是否已經點贊過
    const isLiked = tweet.likes.includes(userId);

    if (isLiked) {
      // 如果已按過讚，則取消按讚
      tweet.likes.pull(userId);
    } else {
      // 如果未按過讚，則添加按讚
      tweet.likes.push(userId);
    }

    await tweet.save();

    res.json({ message: 'Like toggled successfully', isLiked: !isLiked }); // 返回切換後的 isLiked 的狀態
  } catch (error) {
    console.error('Error while toggling like:', error);
    res.status(500).json({ message: 'Failed to toggle like', error: error.message });
  }
};

