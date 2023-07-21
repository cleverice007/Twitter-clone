
const express = require('express');
const app = express();
const authenticationRoutes = require('./routes/authenticationRoutes'); 

app.use(express.json());
app.use('/auth', authenticationRoutes); 

app.listen(3000, () => {
  console.log('伺服器運行在 http://localhost:3000');
});



