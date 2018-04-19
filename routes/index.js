var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//router.use(bodyParser());
var mysql = require('mysql');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'Keyshore',
    database: 'fitness'
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {

	// console.log(req.body.username);
	// console.log(req.body.sex);
	// console.log(req.body.age);
	// console.log(req.body.sub);
	// console.log(req.body.subd);
	

connect.connect(function(error){
    if(error){
        console.log('Error in sql');
    }
    else{
        console.log('Connected to sql');
    }

    var name = req.body.username;

    connect.query("INSERT INTO customer (cust_id, cust_name, sex, age, sub_id, sub_dur, trainer_id, attendance, card_bal) VALUES (NULL,'"+req.body.username+"','"+ req.body.sex+"','"+ req.body.age+"', '1001','"+ req.body.subd+"','"+ req.body.trainer+"', '0', '0');",
     function(err, result, fields){
        if(err) throw err;
        res.end("Your Customer ID is :"+result.insertId);
    });
    //res.end(JSON.stringify(req.body));
});	

// connect.connect(function(error){
//     if(error){
//         console.log('Error');
//     }
//     else{
//         console.log('Connected');
//     }

//     connect.query("INSERT INTO `customer` (`cust_name`, `sex`, `age`, `sub_id`, `sub_dur`, `trainer_id`, `attendance`, `card_bal`) VALUES ('Monith', 'M', '11', '1001', '3', '1', '2', '0');",
//      function(err, result, fields){
//         if(err) throw err;
//         res.end(JSON.stringify(req.body));
//     });
// });	

// connect.connect(function(error){
//     if(error){
//         console.log('Error here');
//     }
//     else{
//         console.log('Connected');
//     }

//     connect.query("Select * from customer", function(err, result, fields){
//         if(err) throw err;

//         console.log(result);
//     });
// });

});

module.exports = router;
