

var mysql = require('mysql');

var Stack = require('stackjs');

var pool = mysql.createPool({
	
	connectionLimit : 500,
	host     		: '127.0.0.1',
    user     		: 'root',
    password 		: 'root',
    database 		: 'eBay',
    debug    		:  false,
    port	 		:	3306
	
});


module.exports = pool;


