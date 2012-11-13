var express = require('express');

var rejectMsg = '<?xml version="1.0" encoding="UTF-8"?><Response><Reject /></Response>'


var mongo = require('mongodb');
var url = require('url');

var Server = mongo.Server,
    Db = mongo.Db;




var uri = 'mongodb://testdb:testdb@alex.mongohq.com:10096/bluelight-monitor';
var db = Db.connect(uri,{auto_reconnect: true},function(err, client) {
	if (err) throw err;

	client.collection('checkins', {safe:true}, function(err, collection) {
		if(err) throw err;

		app.get('/', function(request, response) {
			response.send(rejectMsg);
			var obj = { Date : new Date(),From : request.query.From, query : request.query }
			collection.insert(obj,function(err,res){});
		});

		app.get('/view', function(req, res) {

			var displayLimit =  req.query.limit || 100;
			var skip = req.query.limit || 0;

			collection.find({},{Date :1,From : 1} ).limit(displayLimit).skip(skip).sort({Date : -1}).toArray(function(err, items) {
				if(err) return response.send()

				res.locals({ 'logs':items });
	            res.render('view');
			});
		});

	});
});


var app = express.createServer();

app.configure(function(){
  app.use(express.bodyParser())
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});



var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
