
const mongoose = require('mongoose');
const User = require('./models/user');

// 建立與 MongoDB 的連線
mongoose.connect('mongodb://localhost/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 檢查連線狀態
const db = mongoose.connection;
db.on('error', console.error.bind(console, '連線錯誤：'));
db.once('open', () => {
  console.log('已成功連線至 MongoDB');
});

 const newUser = new User({
   username: 'john',
   password: 'password123',
 });

 const saveUser = async () => {
    try {
      const savedUser = await newUser.save();
      console.log('已儲存使用者：', savedUser);
    } catch (err) {
      console.error(err);
    }
  };

  saveUser();

