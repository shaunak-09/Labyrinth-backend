const express = require("express");
const app = express();
const mysql = require("./database/connection.js").con;
const port = 8000;
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(express.json());
// Routing
app.use('/question',  require('./routes/currentQuestion'));
app.use('/team',  require('./routes/insertTeam'));
app.use('/answer',  require('./routes/submitAnswer'));
app.use('/leaderboard',  require('./routes/leaderboard'));
app.use('/getInfo',  require('./routes/getCurrentInfo'));
app.use('/deregister',  require('./routes/deregisterTeam'));
// Server Listen
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("app is runnig on port : ", port);
  }
});



