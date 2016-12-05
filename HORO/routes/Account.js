var ejs 		= require("ejs");
var winston = require('winston');
var mysql = require("./mysqlConnector");

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayLog.log' })
    ]
});

var express = require('express');


exports.land = function(req, res) {

    ejs.renderFile('./views/Account.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the courseAdd module.");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};

exports.sessionland = function(req, res) {

    ejs.renderFile('./views/sessionAdd.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("successfully rendered the sessionAdd module.");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
};

exports.getCourseCategory = function(req,res){
    var courseCategoryQuery = "SELECT category_id,category_name FROM category_master;";
    logger.log('info', 'SELECT category_id,category_name FROM category_master');
    console.log("Query:: " + courseCategoryQuery);

    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error','Error of getting course category: '+err);
        }
        else {
            if(results.length >0) {

                    logger.log('error', "Error of getting course category: "+err);
                    console.log("Invalid Login");
                    json_responses = {"courseCategory": results};
                    res.send(json_responses);
            }
            else{
                logger.log('error', "Error of getting course category: "+err);
                json_responses = {"statusCode": 401};
                console.log(json_responses);
                res.send(json_responses);
            }
        }

    }, courseCategoryQuery);
}

exports.getAllCourseList = function(req,res){
    console.log(req.session.user_id);

    

    var courseNameQuery = "select m.course_Id,m.course_name from course_master as m join course_details as d on m.course_id = d.course_id where course_instid = "+req.session.user_id+";";
    logger.log('info', "select m.course_Id,m.course_name from course_master as m join course_details as d on m.course_id = d.course_id where course_instid = "+req.session.user_id+";");
    console.log("Query:: " + courseNameQuery);

    mysql.fetchData(function(err,results) {
        if(err) {
            throw err;
            logger.log('error','Error of getting course category: '+err);
        }
        else {
            if(results.length >0) {

                logger.log('error', "Error of getting course category: "+err);
                console.log("Invalid Login");
                json_responses = {"allCourse": results};
                res.send(json_responses);
            }
            else{
                logger.log('error', "Error of getting course category: "+err);
                json_responses = {"statusCode": 401};
                console.log(json_responses);
                res.send(json_responses);
            }
        }
    }, courseNameQuery);
}

exports.setSessionDetails = function(req,res){
    var courseId =req.param("courseId");
    var sessionTitle  =req.param("sessionTitle");
    var sessionDate =req.param("sessionDate");
    var sessionDuration = req.param("sessionDuration");
    var sessionLocation =req.param("sessionLocation");
    var sessionDetail = req.param("sessionDetail");

    var sessionInsert = "INSERT INTO `session` (`course_id`, `session_title`, `session_duration`, `session_date`,`session_location`, `session_details`)VALUES ('"+courseId+"','"+sessionTitle+"','"+sessionDuration+"','" +sessionDate+"','"+sessionLocation+"','"+sessionDetail+"');";

    console.log("Query:: " + sessionInsert);
    mysql.storeData(sessionInsert, function(err, result) {
        //render on success
        if (err) {
            console.log('Invalid session insert!');
            logger.log('info', "Invalid insertion session insert");
            res.send({"statusCode" : 401});
        } else {
            console.log('Session Inserted!');
            logger.log('info', "Valid Session Inserted ");
            res.send({"statusCode" : 200});

        }
    });

}

exports.setCourseDetails = function(req,res){
    var courseName =req.param("courseName");
    var courseCategory  =req.param("courseCategory");
    var courseStartDate =req.param("courseStartDate");
    var courseEndDate =req.param("courseEndDate");
    var courseLanguage = req.param("courseLanguage");
    var courseLectures = req.param("courseLectures");
    var courseDetails = req.param("courseDetails");

    //req.session.user_id = 1;//set user session

    var insertCourseNameQuery = "INSERT INTO course_master (`course_name`, `course_category`) VALUES ('"+courseName+"',"+parseInt(courseCategory)+");";
    console.log("Query:: " + insertCourseNameQuery);

    var getCourseId = "select course_id from course_master where course_name = '" + courseName + "';";
    logger.log('info', "select course_id from course_master where course_name = '" + courseName + "';");
    console.log("Query:: " + getCourseId);


    mysql.storeData(insertCourseNameQuery, function(err, result) {
        //render on success
        if (err) {
            console.log('Invalid SingUp!');
            logger.log('info', "Invalid insertion in course type for: " + courseName);
            res.send({"statusCode" : 401});
        } else {
            console.log('Valid SignUp!');
            logger.log('info', "Valid insertion in course type for: " + courseName);


            mysql.fetchData(function(err,results) {
                if(err) {
                    throw err;
                    logger.log('error','Error of getting course_id Error: '+err);
                }
                else {
                    if(results.length >0) {
                        var insertCourseDetailsQuery = "INSERT INTO `course_details`(`course_id`,`course_instid`,`course_startdate`,`course_enddate`,`course_lectures`,`course_language`,`course_details`)VALUES('"+results[0].course_id+"','"+req.session.user_id+"','"+courseStartDate+"','"+courseEndDate+"',"+10+",'"+courseLanguage+"','"+courseDetails+"');";

                        mysql.storeData(insertCourseDetailsQuery, function(err, result) {
                            if(err) {
                                throw err;
                                logger.log('error','Error of inserting course: '+err);
                            }
                            else{
                                console.log('Valid insert!');
                                logger.log('info', "Valid insertion in course type for: " + courseName);
                                res.send({"statusCode" : 200});
                            }
                        });
                    }
                    else{
                        logger.log('error', "Error of getting course_id Error: "+err);
                        json_responses = {"statusCode": 401};
                        console.log(json_responses);
                        res.send(json_responses);
                    }
                }
            }, getCourseId);
        }
    });




}
