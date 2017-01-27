

var mongoose = require('mongoose');


var LeaderSchema = new mongoose.Schema({
		name : {
			type : String
		},
		score : {
			type : Number
		},
		date : {
			type : Date, 
			default : Date.now
		}
		
	
});

module.exports = mongoose.model('leaderboard', LeaderSchema);
//mongoose is a odm object data model 