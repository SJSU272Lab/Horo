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


exports.land = function(req, res) {
    console.log("********************************here ********************************");
    ejs.renderFile('./views/AttendeeProfile.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the attendee profile module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};

exports.attendeeCourseStatus = function(req, res) {
    console.log("********************************here ********************************");
    ejs.renderFile('./views/AttendeeCourseStatus.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the attendee profile module");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};




exports.view_profile = function(req,res)
{
    console.log("IN VIEW PROFILE FUNCTION");


    var checkLoginQuery = "select * from user_profile where username = '" + req.session.username + "';";
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




exports.getCourseStatus = function(req,res){

    //req.session.user_id = 2 //change after login

    var query = 'select * from course_progress as cp join course_details cd  on cp.course_id = cd.course_Id  join course_master cm on cd .course_Id = cm.course_Id where user_id = '+req.session.user_id+';';


    mysql.storeData(query, function(err, result) {
        //render on success
        if (err) {
            console.log('Invalid data!');
            logger.log('info', "Invalid data up for: " + req.session.user_id);
            res.send({"statusCode" : 401});
        } else {
            console.log('Valid data!');
            logger.log('info', "Valid data for: " + req.session.user_id);
            res.send({"statusCode" : 200,  "result" : result});

        }
    });
}