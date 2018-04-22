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

router.get('/', function(req, res, next) {

    if(req.user.type == 'Manager'){
        res.render('newemp',{errors:'No Errors'});
    }else{
        res.redirect('auth');
    }
});

router.post('/', function(req, res, next) {

    const username = req.body.username;
    const sex = req.body.sex;
    const age = req.body.age;
    const sal = req.body.sal;
    const job = req.body.job
    const pass1 = req.body.pass1;
    const pass2 = req.body.pass2;

    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('username', 'Name must be between 4-15 characters long.').len(4,15);
    req.checkBody('pass1', 'Password is required').notEmpty();
    req.checkBody('pass2', 'Passwords do not match').equals(req.body.pass1);

    let errors = req.validationErrors();

    if(errors){
        res.render('newemp',{
            errors: JSON.stringify(errors)
        });
        //res.end(JSON.stringify(errors));
    }else{
        

        const db = require('../db.js');

        bcrypt.hash(pass1, saltRounds, function(err, hash) {

            db.query("INSERT INTO employee (emp_id, emp_name, sex, age, sal,job, attendance, Password) VALUES (NULL,?,?,?,?,?,'0', ?);",[username, sex, age, sal, job, hash],
            function(err, result, fields){
                if(err) throw err;

                // db.query('SELECT LAST_INSERT_ID() as user_id',function(error, results, fields){
                //     if(error) throw error;

                //     const user_id = results[0];

                //     //console.log('Hello there');
                //     //console.log(results[0]);
                //     req.login(user_id, function(err){

                //       //  console.log('redirect');
                //         res.redirect('/');
                //         //res.end("Your Customer ID is :"+result.insertId + user_id);
                //     });

                    
            
                // });

                res.redirect('/signin');
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