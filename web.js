var express = require('express');

var rejectMsg = '<?xml version="1.0" encoding="UTF-8"?><Response><Reject /></Response>'

var app = express.createServer();

app.configure(function(){
  app.use(express.bodyParser())
});


app.get('/', function(request, response) {
  console.log("Call From: " + request.query.From)
  response.send(rejectMsg);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
