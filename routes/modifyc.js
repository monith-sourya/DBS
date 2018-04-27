var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

// // var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// // /* GET home page. */
// var bcrypt = require('bcrypt');
// const saltRounds = 10;


// router.use(passport.initialize());
// router.use(passport.session());

router.get('/', function(req, res, next) {
    try{
        if(req.user.type=='Receptionist'|| req.user.type=='Manager'){
            // const user = req.user;
            res.render('attlog',{flash:'No Errors'});
        }else{
            res.redirect('auth');
        }
    }catch(err){
        req.flash('err1', 'Please Sign in');
        res.redirect('/signin');
    }
});

router.post('/', function(req, res, next) {

	const userid = req.body.userid;
    const username = req.body.username;
    const sex = req.body.sex;
    const age = req.body.age;
    const phno = req.body.phno;
    const address = req.body.address;
    const email = req.body.email;
    const sub = req.body.sub;
    const subd = req.body.subd;
    const trainer = req.body.trainer;

    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('username', 'Name must be between 4-15 characters long.').len(4,15);
    // req.checkBody('pass1', 'Password is required').notEmpty();
    // req.checkBody('pass2', 'Passwords do not match').equals(req.body.pass1);

    let errors = req.validationErrors();

    if(errors){
        res.render('modifyc',{
            errors: JSON.stringify(errors)
        });
        //res.end(JSON.stringify(errors));
    }else{
        

        const db = require('../db.js');

   
        db.query("UPDATE customer SET cust_name=?, sex=?, age =?, sub_id=?, sub_dur=?, trainer_id=?, phno =?, email=?, address=? WHERE cust_id = ?;",[username, sex, age, sub, subd, trainer,phno,email,address,userid ],
        function(err, result, fields){
            if(err){ 
                req.flash('moderr','Enter Valid Details');

                res.redirect('attlog');
            }
            console.log(result);

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
            req.flash('Plis', 'Successfully Modified.');
            res.redirect('/attlog');
         })
        //res.end(JSON.stringify(req.body));
    }
});
// function getcustdata(username){

//         const db = require('../db.js');

//         //console.log('1');

//         db.query('SELECT * FROM customer WHERE cust_id = ? ', [username],
//             function(err, results, fields){
//                 if(err) {return done(err)};

//                 if(!results.length){
//                     return done(null, false /*,req.flash('loginMessage', 'No user found')*/);
//                 } else{
//                 //var r = results[0].toObject();
//                 var r = JSON.parse(JSON.stringify(results[0]));
//                 r.job = 'Customer';
//                 user = r;
//                 }   
//         })
// }

// function getempdata(username){

//         const db = require('../db.js');

//         //console.log('1');

//         db.query('SELECT * FROM employee WHERE emp_id = ? ', [username],
//             function(err, results, fields){
//                 if(err) {return done(err)};

//                 if(!results.length){
//                     return done(null, false /*,req.flash('loginMessage', 'No user found')*/);
//                 } else{
//                 console.log('Emp user taken');
//                 user = results[0];
//                 }   
//         })
// }

    

module.exports = router;


// function authenticationMiddleware() {  
//     return (req, res, next) => {
//         //console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

//         if (req.isAuthenticated()) return next();
//         res.redirect('/signin')
//     }
// }