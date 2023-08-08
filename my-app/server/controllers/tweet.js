const Tweet = require('../models/tweet');

module.exports.getAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find().populate('author');
        res.json(tweets);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.createTweet = async (req, res) => {
    try {
        const { author, content } = req.body;

        const newTweet = new Tweet({
            author,
            content
        });

        const savedTweet = await newTweet.save();
        res.json(savedTweet);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create tweet' });
    }
};