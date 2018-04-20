const localStartegy = require('passport-local').Strategy


var mysql = require('mysql');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'Keyshore',
    database: 'fitness'
});

module.exports = function(passport){

	passport.use(new localStartegy(function(username, password, done){

		 
	}))
}