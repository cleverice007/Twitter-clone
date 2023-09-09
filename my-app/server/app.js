require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');

const app = express();

app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'https://twitter-clone-mason-4bfa1e4cdc08.herokuapp.com'];

app.use(cors({
  origin: function(origin, callback) {
    // 如果沒有 origin 標頭，或者 origin 在我們的列表中，則允許
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

const mongoose = require('mongoose');
const User = require('./models/user');
const Tweet = require('./models/tweet'); 

// session config
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',  
      secure: false,  
  }
}

app.use(session(sessionConfig))
app.use(flash());


// passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 連接到 MongoDB


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/twitterclone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '連線錯誤：'));
db.once('open', () => {
  console.log('已成功連線至 MongoDB');
});


// 需要在文件頂部添加以下代碼
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'twitter-clone-mason',
    acl: 'public-read', // 設置為 public-read 以讓用戶能夠看到圖片
    key: function (req, file, cb) {
      cb(null, Date.now().toString()); // 使用日期作為文件名
    }
  })
});





//使用得到的路由
const authRoutes = require('./routes/authRoutes'); 
const tweetRoutes = require('./routes/tweetRoutes');
const recommendRoutes = require('./routes/recommendRoutes');

//增加請求體的大小限制
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/auth', authRoutes); 
app.use('/tweets',tweetRoutes);
app.use('/recommend',recommendRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 引入 build 資料夾
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));




// 捕捉所有其他的請求，然後返回 React 的 index.html 檔案
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

