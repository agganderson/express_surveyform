var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index');
});

var server = app.listen(8000, function(){
	console.log('Listening on port 8000');
});

var io = require('socket.io').listen(server);



io.sockets.on('connection', function(socket){
	console.log('USING A SOCKET NOW');
	// console.log(socket.id);
	socket.on('posting_form', function(data){
		var random_number = Math.floor((Math.random() * 1000) + 1);
		// console.log('testing the button' + data.reason);
		socket.emit('updated_message', {response : data});
		socket.emit('random_number', {response : random_number});
	});
});