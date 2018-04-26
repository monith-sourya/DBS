var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// /* GET home page. */
var bcrypt = require('bcrypt');
const saltRounds = 10;


router.use(passport.initialize());
router.use(passport.session());

router.get('/', function(req, res, next) {
	const user = req.user;
  	res.render('signin', {err1 : req.flash('err1'), flash : req.flash('SQL'), user: user});
});

router.post('/',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.end("Success"+ req.user.username);
  });



passport.use(new LocalStrategy(function(username, password, done){
		//console.log(username);
		//console.log(password); 

		const db = require('../db.js');

		//console.log('1');

		db.query('SELECT * FROM customer WHERE cust_id = ? ', [username],
			function(err, results, fields){
				if(err) {return done(err)};

				if(!results.length){
					return done(null, false /*,req.flash('loginMessage', 'No user found')*/);
				} else{
				const hash  = results[0].password.toString();

				bcrypt.compare(password, hash, function(err, res){
					if(res == false){
						console.log('Hash Fail');
						return done(null, false/*, req.flash('loginMessage', 'Wrong Password')*/);

					}else{
						//console.log('Hash Success!');
						return done(null,results[0]);
					}
				});
			}//return done(null, 'asd');	
		})
	}
));

		
	


module.exports = router;
