var ConnectionHelper = require('./helpers/connection').ConnectionHelper;
var PeriodController = require('./controllers/periodcontroller').PeriodController;

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
app.use('/components', express.static(__dirname + '/components'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var Period 		  = new PeriodController();

app.get('/', function(req, res) {  

  Period.view({
      date: req.param('data'), 
      cicle: req.param('ciclo-menstrual'), 
    }
    ,function(error, period) {
    res.render('period_view.jade',
    { 
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
