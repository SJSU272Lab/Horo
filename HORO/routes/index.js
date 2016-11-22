var pool = require("./mysqlConnector");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};


exports.Register = function(req,res)
{

  console.log("Well hello there");

  var cart = { idUser: req.session.username, idProduct: itemId };
  pool.getConnection(function(err,connection){

   connection.query('INSERT INTO cart SET ?', cart, function(err,res)
   {
      if(err)
      {
        logger.log('error', err);
        throw err;
      }

      console.log('Last insert ID:', res.insertId);
   });

   connection.release();
   });


};