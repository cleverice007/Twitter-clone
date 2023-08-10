const express = require('express');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',  
  credentials: true
}));

const mongoose = require('mongoose');
const User = require('./models/user');


// session config
const sessionConfig = {
  secret: 'secret-key',
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
mongoose.connect('mongodb://localhost/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, '連線錯誤：'));
db.once('open', () => {
  console.log('已成功連線至 MongoDB');
});



//使用得到的路由
const authRoutes = require('./routes/authRoutes'); 
const tweetRoutes = require('./routes/tweetRoutes');


app.use('/auth', authRoutes); 
app.use('/tweets',tweetRoutes);

app.listen(4000, () => {
  console.log('伺服器運行在 http://localhost:4000');
});

