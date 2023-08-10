const Tweet = require('../models/tweet');

module.exports.getTweets = async (req, res) => {
    try {
        const userId = req.user._id;  // 取得目前登入的用戶ID

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

        res.json({
            userTweets,
            followersTweets
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.createTweet = async (req, res) => {
    try {
        // 檢查 req.user 和 content 是否存在
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User not authenticated' });
        }
        
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ message: 'Content is required and should not be empty' });
        }

        const author = req.user._id;  

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
        console.error('Error while creating tweet:', error);  // log the error for debugging
        res.status(500).json({ message: 'Failed to create tweet', error: error.message });
    }
};


