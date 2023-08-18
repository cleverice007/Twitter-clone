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
            .sort({ createdAt: -1 });

        // 獲得用戶的跟隨者ID列表
        const user = await User.findById(userId);
        const followersIds = user.followers;

        // 查詢跟隨者的貼文
        const followersTweets = await Tweet.find({
            author: { $in: followersIds }
        }).populate('author').sort({ createdAt: -1 });


        res.json({ userTweets, followersTweets });
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
    const { tweetId, content } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user_id; // 取得目前登入的用戶ID

    // 尋找該貼文
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // 取得評論者的使用者名稱
    const user = await User.findById(userId);

    // 新增評論，包含使用者名稱和評論時間
    tweet.comments.push({ userId, content, username: user.username, createdAt: new Date() });
    await tweet.save();

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error while adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};



// 貼文點讚
module.exports.likeTweet = async (req, res) => {
  try {
    const { tweetId } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user_id; // 獲得目前登入的使用者ID

    // 尋找該貼文
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // 檢查是否已經點贊過
    if (tweet.likes.includes(userId)) {
      return res.status(400).json({ message: 'Tweet already liked' });
    }

    // 新增點贊
    tweet.likes.push(userId);
    await tweet.save();

    res.json({ message: 'Tweet liked successfully' });
  } catch (error) {
    console.error('Error while liking tweet:', error);
    res.status(500).json({ message: 'Failed to like tweet', error: error.message });
  }
};
