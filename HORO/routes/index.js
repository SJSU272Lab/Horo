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
  res.render('index', { title: 'Express' });
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

    var query = "INSERT INTO user_profile (user_firstname, user_lastname, user_gender, user_birthdate, user_city) VALUES ('" + first_name + "','" + last_name + "','" + gender + "','" + dob + "','" + role + "')";
    console.log("Query:: " + query);
    logger.log('info', "Query:: " + query);


    var query2 = "INSERT INTO user_profile (username, account_type, account_date, password) VALUES ('" + userName + "','" + role + "','" + new Date() + "','" + hash + "')";
    console.log("Query:: " + query2);
    logger.log('info', "Query:: " + query2);



    mysql.storeData(query, function(err, result){
        //render on success
        if(err){
            console.log('Invalid SingUp!');
            logger.log('info', "Invalid Sign up for: "+ first_name);
            res.send("false");
        }
        //render or error
        else{
            mysql.storeData(query2, function(err, result) {
                //render on success
                if (err) {
                    console.log('Invalid SingUp!');
                    logger.log('info', "Invalid Sign up for: " + first_name);
                    res.send("false");
                } else {
                    console.log('Valid SignUp!');
                    logger.log('info', "Valid Sign up for: " + first_name);
                    res.send("true");

                }
            });
        }
    });


};