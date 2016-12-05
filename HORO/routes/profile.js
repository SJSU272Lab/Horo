var ejs 		= require("ejs");
//var mysql		= require('./mysql');
//var bid 		= require('./bid');
//var bcrypt 		= require('bcrypt-nodejs');
//var mongo 		= require("./mongo");
//var ObjectId 	= require('mongodb').ObjectID;
//var mq_client 	= require('../rpc/client');
//var winston 	= require('winston');
var fs 			= require('fs');
//var passport 	= require("passport");
//var logDir		= 'log';
//var env 		= process.env.NODE_ENV || 'development';
//var mongoURL 	= "mongodb://localhost:27017/AirbnbDatabaseMongoDB";

//var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
var mysql = require("./mysqlConnector");

var pool = require("./mysqlConnector");



exports.land = function(req, res) {
	console.log("********************************here ********************************");
    ejs.renderFile('./views/Profile.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the signin module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};

exports.HostCourseStatus = function(req,res)
{
    //console.log("********************************here ********************************");
    ejs.renderFile('./views/HostCourseStatus.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the signin module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}


exports.view_profile = function(req,res)
{
    /* console.log("IN view_profile FUNCTION");
     // img path
     var imgPath = "C:\\Users\\jnirg\\Desktop\\PIXECT-20161114145523.jpg";

     // connect to mongo
     mongoose.connect('localhost', 'testing_storeImg');

     // example schema
     var schema = new Schema({
     img: { data: Buffer, contentType: String }
     });

     // our model
     var A = mongoose.model('A', schema);

     mongoose.connection.on('open', function () {
     console.error('mongo is open');

     // empty the collection
     A.remove(function (err) {
     if (err) throw err;

     console.error('removed old docs');

     // store an img in binary in mongo
     var a = new A;
     a.img.data = fs.readFileSync(imgPath);
     a.img.contentType = 'image/png';
     a.save(function (err, a) {
     if (err) throw err;

     console.error('saved img to mongo');

     // start a demo server
     var server = express.createServer();
     server.get('/', function (req, res, next) {
     A.findById(a, function (err, doc) {
     if (err) return next(err);
     res.contentType(doc.img.contentType);
     res.send(doc.img.data);
     });
     });

     server.on('close', function () {
     console.error('dropping db');
     mongoose.connection.db.dropDatabase(function () {
     console.error('closing db connection');
     mongoose.connection.close();
     });
     });

     process.on('SIGINT', function () {
     server.close();
     });

     server.listen(3333, function (err) {
     console.error('press CTRL+C to exit');
     });
     });
     });
     });*/
    console.log("IN VIEW PROFILE FUNCTION");
    /*MongoClient.connect(mongoURL, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', mongoURL);

            console.log(req.session.username);
            var collection = db.collection('login');
            collection.find({username: req.session.username}).toArray(function(err,result){
                if(err)
                {
                    //console.log(result);
                    console.log("ERRR------------"+err);
                    //throw err;
                    db.close();
                    return done(err);
                }
                if(!result) {
                    console.log(result);
                    console.log("REsult not found!!!!!!!!-----");
                    return done(null, false);
                }

                else if(result)
                {
                    console.log(result);
                    console.log("Found it  bitch!!!!!!!!-----");
                    //console.log("found user." + result[0]);
                    db.close();
                    //req.session.username = username;1
                    response={"statusCode" : 200, "Result"	:	result};
                    res.send(response);
                    //done(null, result);
                }
            });
        }
    });*/


/*    connection.connect();
        var query = "select * from user_profile where username = 'j'";
        console.log(query);
        connection.query(query, function(err, rows)
        {
            if(err)
            {
               // logger.log('error', err);
                throw err;
            }
            else
            {
                if(rows.length > 0)
                {
                    //var products=JSON.stringify(rows);
                    response={"statusCode" : 200, "Result"	:	rows, "handle"	:	req.session.username};
                    res.send(response);
                }
                else
                {
                    json_responses = {"statusCode" : 401};
                    res.send(json_responses)
                }
            }
            //				console.log(rows);
        });
        connection.end();*/

    var checkLoginQuery = "select * from user_profile where username = '" +req.session.username+ "';";
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error','Error of user :'+username+ ' Error: '+err);
        }
        else {
            if(results.length >0) {

                response={"statusCode" : 200, "Result"	:	results};
                res.send(response);
            }
            else{
                //logger.log('error', "Invalid Login for username Id: "+username +' user is not registered.');
                json_responses = {"statusCode": 401};
                console.log(json_responses);
                res.send(json_responses);
            }
        }
    }, checkLoginQuery);

}


exports.get_course_details = function(req,res)
{
    console.log("In GET_COURSE_DETAILS");

    var checkLoginQuery = "SELECT * FROM course_details, course_master where course_details.course_detailsid = course_master.course_id ";
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error','Error of user :'+username+ ' Error: '+err);
        }
        else {
            if(results.length >0) {

                response={"statusCode" : 200, "Result"	:	results};
                res.send(response);
            }
            else{
                //logger.log('error', "Invalid Login for username Id: "+username +' user is not registered.');
                json_responses = {"statusCode": 401};
                console.log(json_responses);
                res.send(json_responses);
            }
        }
    }, checkLoginQuery);
}


exports.get_host_added_courses = function(req,res)
{
    console.log("In GET_COURSE_DETAILS");

    var checkLoginQuery = "select course_details.course_id, course_details.course_details, course_details.course_instid, course_details.course_language, user_master.user_id,course_details.course_duration, course_details.course_startdate, course_details.course_enddate, course_master.course_name, course_master.course_id from user_master, course_details, course_master where course_details.course_instid = user_master.user_id and course_master.course_id = course_details.course_id and user_master.username = '"+req.session.username+"'";
    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error','Error of user :'+username+ ' Error: '+err);
        }
        else {
            if(results.length >0) {

                response={"statusCode" : 200, "Result"	:	results};
                res.send(response);
            }
            else{
                //logger.log('error', "Invalid Login for username Id: "+username +' user is not registered.');
                json_responses = {"statusCode": 401};
                console.log(json_responses);
                res.send(json_responses);
            }
        }
    }, checkLoginQuery);
}





exports.change_password = function(req, res)
{
    console.log("IN CHANGE PASSWORD");
}