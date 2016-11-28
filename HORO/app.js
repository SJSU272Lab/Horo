/**
 * Module dependencies.
**/

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')  
  , calculator = require('./routes/calculator')
  , home = require('./routes/home')
  , gallery = require('./routes/gallery')
  , course =  require('./routes/caurse')
    ,courseDetail =  require('./routes/course-detail')
    , session = require('client-sessions')
    ,contact = require('./routes/contact');

var index = require('./routes/index');
var profile = require('./routes/profile');
var editprofile = require('./routes/EditProfile');
var courseadd = require('./routes/Account');

var app = express();

//configure the sessions with our application
app.use(session({

  cookieName: 'session',
  secret: 'cmpe273_test_string',
  duration: 30 * 60 * 1000,    //setting the time for active session
  activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently


  


// all environments
app.set('port', process.env.PORT || 3000);

//__dirname is the name of the directory that the currently executing script resides in.
app.set('views', __dirname + '/views');

//Setting View Engine
app.set('view engine', 'ejs');

//add middleware
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(express.favicon());


//app.use(express.logger('dev'));

//parse json
app.use(express.bodyParser());

//app.use(express.methodOverride());

//sets router folder
app.use(app.router);

//To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
//http://localhost:3000/stylesheets/style.css
app.use(express.static(path.join(__dirname, 'public')));

// development only // default error handler
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//GET
app.get('/', home.redirectToHome);
 app.get('/Gallery',gallery.redirectToGallery);
 app.get('/course',course.redirectToCourse);
 app.get('/courseDetail',courseDetail.redirectToCoursedetail);
 app.get('/contact',contact.redirectToContact);
 app.get('/Index', index.index);
 app.get('/Profile',profile.land);
app.get('/EditProfile',editprofile.land);
app.get('/Account',courseadd.land);

//POST
app.post('/getAddition',calculator.getAddition);
app.post('/getSubtraction',calculator.getSubtraction);
app.post('/getMultiplication',calculator.getMultiplication);
app.post('/getDivision',calculator.getDivision);
app.post('/view_profile', profile.view_profile);
app.post('/edit_profile', editprofile.edit_profile);

app.post('/signupForVolunteerAndAttendee',index.signupForVolunteerAndAttendee);
app.post('/signinForVolunteerAndAttendee',index.signinForVolunteerAndAttendee);

app.post('/getCourseCategory',courseadd.getCourseCategory);
app.post('/getAllCourseList',courseadd.getAllCourseList);
app.post('/setSessionDetails',courseadd.setSessionDetails);
app.post('/setCourseDetails',courseadd.setCourseDetails);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
