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

    if(req.user.type=='Receptionist'|| req.user.type=='Manager'){
        res.render('newuser',{flash : req.flash('SQL')});
    }else{
        res.redirect('auth');
    }
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
        req.flash('SQL',JSON.stringify(errors) );
        res.redirect('/newuser');
        //res.end();
    }else{
        

        const db = require('../db.js');

        bcrypt.hash(pass1, saltRounds, function(err, hash) {

            var userid;

            db.query("INSERT INTO customer (cust_id, cust_name, sex, age, sub_id, sub_dur, trainer_id, attendance, card_bal) VALUES (NULL,?,?,?,?,?,?, '0', '0');",[username, sex, age, sub, subd, trainer],
            function(err, result, fields){
                if(err) {
                    console.log(err);
                    req.flash('SQL', "Error Registering User Details.");
                    res.redirect('/newuser');
                }else{

                //console.log(result);

                db.query('UPDATE users SET password= ? WHERE user_id=?;',[hash, result.insertId] ,function(error, results, fields){
                    if(error) {
                        throw error;

                        req.flash('SQL', 'Error Storing Password.');
                        res.redirect('/newuser');

                    }else{

                     //  console.log('redirect');

                        // userid = JSON.parse(JSON.stringify(result));

                        console.log('results are :'+ JSON.stringify(result));
                        // console.log(userid);
                        // console.log('blah' + JSON.stringify(userid.insertID));
                        console.log(result.insertId);
                        req.flash('SQL', 'Succesfully Registered User. USER ID is: ' + result.insertId);
                        res.redirect('/newuser');
                    }
                });

                // res.redirect('/signin');
                }
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