
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); 
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

app.use(express.json());
app.use(cors()); // 使用 cors 套件處理跨來源請求

const mongoose = require('mongoose');
const User = require('./models/user');


const sessionConfig = {
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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



