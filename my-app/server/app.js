
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 


app.use(express.json());
app.use(cors()); // 使用 cors 套件處理跨來源請求

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


app.use('/auth', authRoutes); 




// 跟前端不一樣
app.listen(4000, () => {
  console.log('伺服器運行在 http://localhost:4000');
});



