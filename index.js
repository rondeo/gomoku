const http = require('http');
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
app.use(compression());
app.use(express.static(path.join(__dirname, './static'), {
  maxAge: '1h'
}));
app.use('/static', express.static(path.join(__dirname, './static'), {
  maxAge: '1h'
}));
http.createServer(app).listen(process.env.PORT || 3000, async (err) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Client app server running');
  }
});
