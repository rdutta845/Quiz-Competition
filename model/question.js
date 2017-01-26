

var mongoose = require('mongoose');


var QuizSchema = new mongoose.Schema({
	
	question :{ 
		type : [String],
		unique: true
	},
	answers : {
		type: [String],
		unique: true
		
	},
	correct : {
		type : String,
		unique : true
	}
	

});

module.exports = mongoose.model('Quiz',QuizSchema);
//mongoose is a odm object data model 