
exports.getCalculator = function(req, res){
	console.log("In Calculator Application.");
	res.render('calculator', { validationMessage: 'Empty Message'});
};


exports.getAddition= function(req, res){
	console.log("In getAddition Method");
		
	var numberOne = req.param("numberOne");
	var numberTwo = req.param("numberTwo");
	var result = parseFloat(numberOne)+parseFloat(numberTwo);
	
	console.log("Computing: "+ numberOne +" + "+ numberTwo+ " = " +result);
	json_response = {"resultOfOperation":result};
	res.send(json_response);
};


exports.getSubtraction= function(req, res){
	console.log("In getSubtraction Method");
		
	var numberOne = req.param("numberOne");
	var numberTwo = req.param("numberTwo");
	var result = parseFloat(numberOne)-parseFloat(numberTwo);
	
	console.log("Computing: "+ numberOne +" - "+ numberTwo+ " = " +result);
	json_response = {"resultOfOperation":result};
	res.send(json_response);
};


exports.getMultiplication = function(req, res){
	console.log("In getMultiplication Method");
		
	var numberOne = req.param("numberOne");
	var numberTwo = req.param("numberTwo");
	var result = parseFloat(numberOne)*parseFloat(numberTwo);
	
	console.log("Computing: "+ numberOne +" * "+ numberTwo+ " = " +result);
	json_response = {"resultOfOperation":result};
	res.send(json_response);
};


exports.getDivision = function(req, res){
	console.log("In getDivision Method");
		
	var numberOne = req.param("numberOne");
	var numberTwo = req.param("numberTwo");
	var result = parseFloat(numberOne)/parseFloat(numberTwo);
	
	console.log("Computing: "+ numberOne +" / "+ numberTwo+ " = " +result);
	json_response = {"resultOfOperation":result};
	res.send(json_response);
};
