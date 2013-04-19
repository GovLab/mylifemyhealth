var express = require('express');

var app = express();

app.configure(function(){
  app.use(express.favicon()); // not needed if favicon.ico in /public
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.limit('1kb'));
  app.use(express.bodyParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(do404);
});

function do404(request, response, next){
  response.status(404);
  response.send('What is the sound of one hand clapping?');
}

//app.get('/', function(request, response){
//  response.render('index', {title: 'kickswatch',
//                            sentinfo: 'DATA'});
//});

app.listen(app.get('port'), function(){
  console.log("Listening on " + app.get('port'));
});
