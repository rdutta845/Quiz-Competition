var express = require('express');
var router = express.Router();

/* GET home page. */

//using the model//
var Quiz = require("../model/question");
var Leader = require("../model/leaderboard");



router.get('/', function (req, res, next) {
  //var obj = { "ques" : ques, "answer" : ans, "option" : opt};
  
  Quiz.find({}).exec(function (err, quizs){
  	if(err){
  		return err;
  		}
  	 
  	//console.log(quizs);
  	res.render('quiz', { quizs : quizs });
  })
});

router.get('/leader', function (req, res, next) {
  //var obj = { "ques" : ques, "answer" : ans, "option" : opt};
  
  Leader.find({}).sort({ score : -1 }).exec(function (err, quizs){
  	if(err){
  		return err;
  		}
  	 
  	//console.log(quizs);
  	res.render('leaderboard', { quizs : quizs });
  })
});


router.post('/',function (req,res){ 
	var data = req.body;
	var user_ans = req.body.obj;
	var name = req.body.name;
	var actual_ans = [];
	var point = 0;
	//console.log(user_ans);
	//console.log(actual_ans);
	//console.log( data.name );
	var leader = new Leader(data);

	Quiz.find({})
      .select({ _id : 1, correct : 1})
        .exec(function (err,ser_data){
          if(err){
            console.log(err);
          }
           
               ser_data.forEach( function (actual_value){
                  
                  user_ans.forEach( function (user_value){
                  
                    if(actual_value._id == user_value.id){
                      if(actual_value.correct == user_value.result){
                        point = point + 1;
                      }
                    }
                  });
					
                });

 				var value = { "name" : name, "score" : point}
 				var leader = new Leader(value);
 				leader.save(function(err,result){
					
				if(err){
					return res.json({error : true , reason : err});

				}
        console.log(result);
				return res.json({error : false});

				});
 						
     });

	});	

module.exports = router;
