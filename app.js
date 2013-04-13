var express = require('express');
var SessionStore = require('connect-mongo')(express);

var app = express();

app.configure(function(){
  app.use(express.favicon()); // not needed if favicon.ico in /public
  app.set('secret', process.env.MONGOLAB_URI || 'mongodb://localhost/test');
  app.set('collections', ['default']); // Change!
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.limit('1kb'));
  app.use(express.bodyParser());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session({store: new SessionStore({url: app.get('secret')})}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(do404);
});

function do404(request, response, next){
  response.status(404);
  response.send('What is the sound of one hand clapping?');
}

var db = require('mongojs').connect(app.get('secret'), app.get('collections'));

app.get('/', function(request, response){
  response.render('index', {demo: '^_^'});
});

app.listen(app.get('port'), function(){
  console.log("Listening on " + app.get('port'));
});
