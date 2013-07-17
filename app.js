var ConnectionHelper = require('./helpers/connection').ConnectionHelper;
var PeriodController = require('./controllers/periodcontroller').PeriodController;
var UserController 	 = require('./controllers/usercontroller').UserController;

/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var //Connection 	= new ConnectionHelper('db_fert', '127.0.0.1', 27017),
	  Period 		  = new PeriodController(),
	  User 		    = new UserController();

app.get('/', routes.index);

app.get('/period/view', function(req, res) {  

  Period.view({
      date: req.param('data'), 
      cicle: req.param('ciclo-menstrual'), 
    }
    ,function(error, period) {

    res.render('period_view.jade',
    { 
      title  : 'Veja o Período',
      period : period
    });

  });

});

app.get('/period/calendar-content', function (req, res) {

  Period.view({
      date: req.param('data'), 
      cicle: req.param('ciclo-menstrual'), 
    }
    ,function(error, period) {

    res.render('period_calendar.jade',
    { 
      period : period
    });

  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
