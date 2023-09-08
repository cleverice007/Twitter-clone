const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profileImageBase: { type: String, default: null }, 
  backgroundImageBase: { type: String, default: null }, 
  introduction: { type: String, default: null },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;



