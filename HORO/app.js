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
var attendee = require('./routes/attendeeProfile');
var course1 = require('./routes/Course');
var NGOProfile = require('./routes/NGOProfile');
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
 app.get('/Profile',profile.land); //DONE
 app.get('/HostCourseStatus', profile.HostCourseStatus);

app.get('/EditProfile',editprofile.land);
app.get('/Account',courseadd.land);
app.get('/sessionland',courseadd.sessionland);
app.get('/attendeeProfile',attendee.land); // DONE
app.get('/attendeeCourseStatus',attendee.attendeeCourseStatus);

app.get('/NGOProfile',NGOProfile.NGOProfile); //DO
app.get('/NGOCoursesInArea',NGOProfile.NGOCoursesInArea);
app.get('/NGOAttendeesInArea',NGOProfile.NGOAttendeesInArea);

app.post('/NGOview_profile',NGOProfile.NGOview_profile);
app.post('/getAllCoursesInArea',NGOProfile.getAllCoursesInArea);
app.post('/getAllAttendeesInArea',NGOProfile.getAllAttendeesInArea);
app.post('/setCourseToAttendee',NGOProfile.setCourseToAttendee);
app.post('/subscribeSubject', course1.subscribeSubject);
app.post('/getAllCoursesWithHostsInArea',NGOProfile.getAllCoursesWithHostsInArea);

//POST
app.post('/get_course_details', index.get_course_details);
app.post ('/getSessiondata',index.getSessiondata);
app.post('/view_profile', profile.view_profile);
app.post('/view_profile_for_attendee', attendee.view_profile);


app.post('/signupForVolunteerAndAttendee',index.signupForVolunteerAndAttendee);
app.post('/signinForVolunteerAndAttendee',index.signinForVolunteerAndAttendee);

app.post('/getCourseCategory',courseadd.getCourseCategory);
app.post('/getAllCourseList',courseadd.getAllCourseList);
app.post('/setSessionDetails',courseadd.setSessionDetails);
app.post('/setCourseDetails',courseadd.setCourseDetails);
app.post('/get_course_details', course1.get_course_details);
app.post('/get_course_page', course1.get_course_page);
app.post('/viewCoursePage', course1.viewCoursePage);
app.post('/get_host_added_courses', profile.get_host_added_courses);

app.post('/getCourseStatus',attendee.getCourseStatus);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
