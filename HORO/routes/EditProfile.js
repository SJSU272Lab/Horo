var ejs 		= require("ejs");
var fs 			= require('fs');


/*var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'ebayLog.log' })
    ]
});*/


var express = require('express');

var mysql = require("./mysqlConnector");


exports.land = function(req, res) {

    ejs.renderFile('./views/EditProfile.ejs', function(err, result) {
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


exports.edit_profile = function(req, res)
{
    console.log("IN EDIT PROFILE FUNCTION");
    response={"statusCode" : 200};
    res.send(response);
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

                else if(result)
                {
                    console.log(result);

                    //collection.remove({username: req.session.username});

                    var saltRounds = 10;
                    var myPlaintextPassword = req.param("inputPassword");
                    //var salt = bcrypt.genSaltSync(saltRounds);
                    var hash = bcrypt.hashSync(myPlaintextPassword);
                    var dt = new Date();
                    var first_name		= req.param("first_name");
                    var last_name		= req.param("last_name");
                    var gender	        = req.param("gender");
                    var city	        = req.param("city");
                    var description     = req.param("description");

                    collection.update(
                        {username: req.session.username},
                        {$set:
                            {
                                "fname": first_name,
                                "lname": last_name,
                                "password": hash
                            }}
                    );



                    response={"statusCode" : 200};
                    res.send(response);

                    /!*var msg_payload = {
                        "saltRounds"			: saltRounds,
                        "myPlaintextPassword"	: req.param("inputPassword"),
                        "salt"					: bcrypt.genSaltSync(saltRounds),
                        "hash"					: bcrypt.hashSync(myPlaintextPassword),
                        "dt"					: dt,
                        "first_name"			: req.param("first_name"),
                        "last_name"				: req.param("last_name"),
                        "inputUsername"			: req.param("inputUsername"),
                        "inputPassword"			: hash

                    };

                    console.log("ADDING A POST REQUEST register_new_user_queue QUEUE WITH msg_payload as:");
                    console.log(msg_payload);
                    //logger.info("ADDING A POST REQUEST ON register_new_user_queue QUEUE WITH msg_payload as:");
                    //logger.info(msg_payload);

                    mq_client.make_request('register_new_user_queue', msg_payload, function(err, results){
                        console.log(results);
                        if(err){
                            throw err;
                        }
                        else {
                            req.session.username = req.param("inputUsername");

                            response={"statusCode" : 200, "Result"	:	results};
                            res.send(response);
                        }
                    });*!/
                    //done(null, result);
                }
            });
        }
    });*/

    first_name = req.param("first_name");
    last_name = req.param("last_name");
    city = req.param("city");
    gender = req.param("gender");

    var query = "UPDATE user_profile SET user_firstname = '" +first_name+ "', user_lastname = '"+ last_name+"',user_gender= '"+gender+ "', user_city = '" +city+"'  WHERE username = 'j' ";

    mysql.storeData(query, function(err, result){
        //render on success
        if(err){
            console.log('Invalid SingUp!');
            //logger.log('info', "Invalid Sign up for: "+ first_name);
            res.send({"statusCode" : 401});
        }
        //render or error
        else{

            console.log('Valid SignUp!');
            //logger.log('info', "Valid Sign up for: " + first_name);
            res.send({"statusCode" : 200});

            }
    });
}