var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var connect = mysql.createConnection({
    host: '192.168.0.13',
    user: 'vishnu',
    password : 'Keyshore',
    database: 'fitness'
});

connect.connect(function(error){
    if(error){
        console.log('Error');
    }
    else{
        console.log('Connected');
    }

    connect.query("Select * from customer", function(err, result, fields){
        if(err){
            console.log(err.message);
        }

        var print = result;
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about');
});

module.exports = router;