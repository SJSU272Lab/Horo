var ejs 		= require("ejs");
//var mysql		= require('./mysql');
//var bid 		= require('./bid');
//var bcrypt 		= require('bcrypt-nodejs');
//var mongo 		= require("./mongo");
//var ObjectId 	= require('mongodb').ObjectID;
//var mq_client 	= require('../rpc/client');
//var winston 	= require('winston');
var winston = require('winston');
var fs 			= require('fs');
//var passport 	= require("passport");
//var logDir		= 'log';
//var env 		= process.env.NODE_ENV || 'development';
//var mongoURL 	= "mongodb://localhost:27017/AirbnbDatabaseMongoDB";

//var mongodb = require('mongodb');
//var MongoClient = mongodb.MongoClient;
var mysql = require("./mysqlConnector");

var pool = require("./mysqlConnector");


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayLog.log' })
    ]
});


exports.NGOProfile = function(req, res) {
    console.log("********************************here ********************************");
    ejs.renderFile('./views/NGOProfile.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the NGO profile module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};
exports.NGOCoursesInArea = function(req, res) {
    console.log("********************************here ********************************");
    ejs.renderFile('./views/NGOCoursesInArea.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the NGO course module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};
exports.NGOAttendeesInArea = function(req, res) {
    console.log("********************************here ********************************");
    ejs.renderFile('./views/NGOAttendeesInArea.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the NGO  attendee module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};



exports.NGOview_profile = function(req,res)
{
    console.log("IN VIEW PROFILE FUNCTION");


    var checkLoginQuery = "SELECT * FROM ngo_master where ngo_id=1;";
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

exports.getAllCoursesInArea= function(req,res){

    req.session.NGO_id = 1 //change after login

    var query = 'select s.course_id, cm.course_name from session as s join course_master as cm on s.course_id = cm.course_id where s.session_location in (select  ngo_city  from ngo_master where ngo_id = '+req.session.ngo_id+') group by course_id;';


    mysql.storeData(query, function(err, result) {
        //render on success
        if (err) {
            console.log('Invalid data!');
            logger.log('info', "Invalid data up for: " + req.session.NGO_id);
            res.send({"statusCode" : 401});
        } else {
            console.log('Valid data!');
            logger.log('info', "Valid data for: " + req.session.NGO_id);
            res.send({"statusCode" : 200,  "result" : result});

        }
    });
}

exports.getAllAttendeesInArea= function(req,res){

    req.session.ngo_id = 1 //change after login () for NGO[]

    var query = "SELECT * FROM user_master as m join user_profile as p on m.username = p.username where account_type = 'attendee' and  user_city in (select  ngo_city  from ngo_master where ngo_id = "+req.session.ngo_id+");";

    mysql.storeData(query, function(err, result) {
        //render on success
        if (err) {
            console.log('Invalid data!');
            logger.log('info', "Invalid data up for: " + req.session.ngo_id);
            res.send({"statusCode" : 401});
        } else {
            console.log('Valid data!');
            logger.log('info', "Valid data for: " + req.session.ngo_id);
            res.send({"statusCode" : 200,  "result" : result});

        }
    });
}

exports.setCourseToAttendee=function(req,res){
    var course_id = req.param("course_id");
    var user_id  = req.param("user_id");
    var progress = req.param("progress"); //0

    var searchAttendeeToCourse=  "select count(*) as count from course_progress where course_id = "+course_id+" and user_id= "+user_id+";";
    console.log("Query:: "+searchAttendeeToCourse);

    var RegisterAttendeeToCourse= "INSERT INTO `course_progress`(`course_id`,`user_id`,`progress`)VALUES("+course_id+","+user_id+","+progress+");";
    console.log("Query:: " + RegisterAttendeeToCourse);

    mysql.storeData(searchAttendeeToCourse, function(err, result) {
        //render on success
        if (err) {
            console.log('Invalid data!');
            logger.log('info', "Invalid data up for: " + user_id);
            res.send({"statusCode" : 401});
        } else {
            console.log('Valid data!');
            logger.log('info', "Valid data for: " + user_id);

            var count = result[0].count;
            if(count<1) {
                mysql.storeData(RegisterAttendeeToCourse, function (err, result) {
                    //render on success
                    if (err) {
                        console.log('Invalid reg!');
                        logger.log('info', "Invalid insertion in reg type for: " + course_id);
                        res.send({"statusCode": 401});
                    } else {
                        console.log('Valid reg!');
                        logger.log('info', "Valid insertion in course type for: " + course_id);
                    }
                });
            }
            else{
                console.log('Invalid data!');
                logger.log('info', "Invalid data up for: " + user_id);
                res.send({"statusCode" : 501, "ElementExists":true});
            }
        }
    });



}

exports.getAllCoursesWithHostsInArea= function(req,res){

    var query = 'select * from user_master as m join user_profile as  p  on m.username= p.username   join course_details as d  on m.user_id = d.course_instid where  p.user_city = "San Jose" and m.account_type = "volunteer";';

    mysql.storeData(query, function(err, result) {
        //render on success
        if (err) {
            console.log('Invalid data!');

            res.send({"statusCode" : 401});
        } else {
            console.log('Valid data!');
           
            res.send({"statusCode" : 200,  "result" : result});

        }
    });
}

