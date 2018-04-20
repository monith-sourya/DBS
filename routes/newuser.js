var express = require('express');
var router = express.Router();
// var expressValidator = require('express-validator');
// router.use(expressValidator());
// var bodyParser = require('body-parser');
// //router.use(bodyParser());


// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({
//   extended: true
// }));

var passport = require('passport');
/* GET home page. */
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.get('/', function(req, res, next) {
  res.render('newuser',{errors:'No Errors'});
});

router.post('/', function(req, res, next) {

    const username = req.body.username;
    const sex = req.body.sex;
    const age = req.body.age;
    const sub = req.body.sub;
    const subd = req.body.subd;
    const trainer = req.body.trainer;
    const pass1 = req.body.pass1;
    const pass2 = req.body.pass2;

    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('username', 'Name must be between 4-15 characters long.').len(4,15);
    req.checkBody('pass1', 'Password is required').notEmpty();
    req.checkBody('pass2', 'Passwords do not match').equals(req.body.pass1);

    let errors = req.validationErrors();

    if(errors){
        res.render('newuser',{
            errors: JSON.stringify(errors)
        });
        //res.end(JSON.stringify(errors));
    }else{
        

        const db = require('../db.js');

        bcrypt.hash(pass1, saltRounds, function(err, hash) {

            db.query("INSERT INTO customer (cust_id, cust_name, sex, age, sub_id, sub_dur, trainer_id, attendance, card_bal, Password) VALUES (NULL,?,?,?,?,?,?, '0', '0', ?);",[username, sex, age, sub, subd, trainer, hash],
            function(err, result, fields){
                if(err) throw err;

                db.query('SELECT LAST_INSERT_ID() as user_id',function(error, results, fields){
                    if(error) throw error;

                    const user_id = results[0];

                    console.log(results[0]);
                    req.login(user_id, function(err){
                        res.redirect('/');
                    });

                    res.end("Your Customer ID is :"+result.insertId);
            
                });
              } )
            //res.end(JSON.stringify(req.body));
        });
    }
});


passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
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

//});


module.exports = router;
