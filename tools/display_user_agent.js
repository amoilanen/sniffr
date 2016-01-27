var express = require('express');
var app = express();

function getUserAgent(req) {
  return 'user-agent: ' + req.headers['user-agent']
}

app.get('/', function (req, res) {
  var userAgent = getUserAgent(req);

  console.log(userAgent);
  res.send(userAgent);
});

app.listen(8000, function () {
  console.log('Server started on port 8000');
});
