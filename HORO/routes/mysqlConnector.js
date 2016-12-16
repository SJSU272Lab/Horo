var ejs= require('ejs');
var mysql = require('mysql');
var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'horolog.log' })
    ]
});

function getConnection(){
    var connection = mysql.createPool(
        {
            connectionLimit : 500, // The maximum number of connections to create at once. https://github.com/mysqljs/mysql
            host     : 'us-cdbr-iron-east-04.cleardb.net',
            user     : 'b5335de2ec3ff5',
            password : 'f61daee5',
            database : 'ad_bf078d2b56c081d',
            port	 : 3306
        });
    return connection;
}

function fetchData(callback,sqlQuery){

    logger.log('info', 'SQL Query::'+sqlQuery);
    console.log("\nSQL Query::"+sqlQuery);

    var connection=getConnection();
    connection.getConnection(function(err, connection){
        connection.query(sqlQuery, function(err, rows, fields) {
            if(err){
                logger.log('error', 'ERROR: ' + err.message);
                console.log("ERROR: " + err.message);
            }
            else
            {	// return err or result
                logger.log('info', 'DB Results:'+rows);

                console.log("DB Results:");
                console.log(rows);
                callback(err, rows);
            }
            connection.release();
            logger.log('info', '\nConnection closed..');
            console.log("\nConnection closed..");
        });
    });
}

function fetchDataWithoutPool(callback,sqlQuery){

    logger.log('info', 'SQL Query::'+sqlQuery);
    console.log("\nSQL Query::"+sqlQuery);

    var connection=mysql.createConnection({
        host     : 'us-cdbr-iron-east-04.cleardb.net',
        user     : 'b5335de2ec3ff5',
        password : 'f61daee5',
        database : 'ad_bf078d2b56c081d',
        port	 : 3306
    });
    connection.connect();

    connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            logger.log('error', 'ERROR: ' + err.message);
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            logger.log('info', 'DB Results:'+rows);

            console.log("DB Results:");
            console.log(rows);
            callback(err, rows);
        }

        logger.log('info', '\nConnection closed..');
        console.log("\nConnection closed..");
    });

    connection.end();
}

function storeData(sqlQuery,callback){
    logger.log('info', '---SQL Query ::' + sqlQuery + '---');
    console.log('---SQL Query ::' + sqlQuery + '---');
    var connection = getConnection();
    connection.getConnection(function(err, connection){
        connection.query(sqlQuery, function(err, results){
            //render on success
            if(!err){
                logger.log('error', 'Database Results :: ' + results);
                console.log('Database Results :: ' + results);
                callback(err, results);
            }
            //render or error
            else{
                logger.log('info', 'Error in getting results');
                console.log('Error in getting results');
                callback(err, results);
            }
            connection.release();
            logger.log('info', 'Store Connection Closed');
            console.log('Store Connection Closed');

        });
    });
}

function deleteData(sqlQuery, callback){
    logger.log('info', '---SQL Query ::' + sqlQuery + '---');
    console.log('---SQL Query ::' + sqlQuery + '---');
    var connection = getConnection();
    connection.getConnection(function(err, connection){
        connection.query(sqlQuery, function(err, results){
            //render on success
            if(!err){
                logger.log('error', 'Database Results :: '+results);
                console.log('Database Results :: ');
                console.log(results);
                callback(err, results);
            }
            //render or error
            else{
                logger.log('info', 'Error in getting results');
                console.log('Error in getting results');
                callback(err, results);
            }
            connection.release();
            logger.log('info', 'Store Connection Closed');
            console.log('Store Connection Closed');
        });
    });
}

exports.fetchData=fetchData;
exports.fetchDataWithoutPool=fetchDataWithoutPool;
exports.storeData=storeData;
exports.deleteData=deleteData;





