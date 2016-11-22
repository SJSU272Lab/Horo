/**
 * Created by Gaurang on 21-11-2016.
 */
exports.redirectToHome = function(req, res){
    res.render('index', { title: 'Express' });
};
