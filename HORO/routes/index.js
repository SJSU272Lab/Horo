var mysql = require("./mysqlConnector");
var bcrypt = require('./bCrypt.js');
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayLog.log' })
    ]
});

exports.index = function(req, res){
  res.render('index', { title: "Hello"});
};

exports.getSessiondata = function(req, res){
    res.send({"statusCode" : 200, "username": req.session.username });
};

exports.signupForVolunteerAndAttendee = function(req,res)
{

  console.log("Inside Signup on nodejs.");

    var first_name = req.param("first_name");
    var last_name = req.param("last_name");
    var userName =  req.param("userName");
    var gender = req.param("gender");
    var city = req.param("city");
    var inputPassword = req.param("inputPassword");//not added in database
    var dob = req.param("dob");
    var role = req.param("role");


    var hash = bcrypt.hashSync(inputPassword);

    var query = "INSERT INTO user_profile (username, user_firstname, user_lastname, user_gender, user_birthdate, user_city) VALUES ('"+userName+"','" + first_name + "','" + last_name + "','" + gender + "','" + dob + "','" + city + "')";
    console.log("Query:: " + query);
    logger.log('info', "Query:: " + query);


    var query2 = "INSERT INTO user_master (username, account_type, account_date, password) VALUES ('" + userName + "','" + role + "','" + new Date() + "','" + hash + "')";
    console.log("Query:: " + query2);
    logger.log('info', "Query:: " + query2);



    mysql.storeData(query2, function(err, result){
        //render on success
        if(err){
            console.log('Invalid SingUp!');
            logger.log('info', "Invalid Sign up for: "+ first_name);
            res.send({"statusCode" : 401});
        }
        //render or error
        else{
            mysql.storeData(query, function(err, result) {
                //render on success
                if (err) {
                    console.log('Invalid SingUp!');
                    logger.log('info', "Invalid Sign up for: " + first_name);
                    res.send({"statusCode" : 401});
                } else {
                    console.log('Valid SignUp!');
                    logger.log('info', "Valid Sign up for: " + first_name);
                    res.send({"statusCode" : 200});

                }
            });
        }
    });


};

exports.signinForVolunteerAndAttendee= function(req,res)
{

    console.log("Inside signin on nodejs.");

    var username = req.param("username");
    var password = req.param("password");


    if(username != '') {
        var checkLoginQuery = "select user_id,username,password,account_type from user_master where username = '" + username + "';";
        logger.log('info', 'select user_id,username,password,account_type from user_master where EmailId = '+username);
        console.log("Query:: " + checkLoginQuery);

        mysql.fetchData(function(err,results) {
            if(err) {
                throw err;
                logger.log('error','Error of user :'+username+ ' Error: '+err);
            }
            else {
                if(results.length >0) {
                    if (bcrypt.compareSync(password, results[0].password)) {

                        console.log("Successful Login");
                        logger.log('info', 'Successful Login for = ' + username + ' userId: ' + results[0].username);
                        console.log("username :  " + results[0].username);
                        req.session.username = username;
                        req.session.user_id = results[0].user_id;

                        logger.log('info', "Session Initialized with username : " + req.session.username);
                        console.log("Session Initialized with username : " + req.session.username);

                        if(results[0].account_type=='volunteer') {
                            json_responses = {"statusCode": 200}; 
                        }else if(results[0].account_type=='attendee'){
                            json_responses = {"statusCode": 201};
                        }
                        res.send(json_responses);
                    }

                    else {
                        logger.log('error', "Invalid password for username Id: " + username);
                        console.log("Invalid Login");
                        json_responses = {"statusCode": 401};
                        res.send(json_responses);
                    }
                }
                else{
                    logger.log('error', "Invalid Login for username Id: "+username +' user is not registered.');
                    json_responses = {"statusCode": 401};
                    console.log(json_responses);
                    res.send(json_responses);
                }
            }
        }, checkLoginQuery);
    }





};


exports.get_course_details = function(req,res)
{
    console.log("In GET_COURSE_DETAILS");

    var checkLoginQuery = "SELECT * FROM course_details, course_master, category_master where course_details.course_id = course_master.course_id and category_master.category_id = course_master.course_category ";
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