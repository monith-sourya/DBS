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


//var user;
/* GET home page. */

router.get('/', authenticationMiddleware(),function(req, res, next) {
    res.render('index', { title: req.user.user_id });
    //res.redirect('/profile');
});


router.get('/signin', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/');
    }
    res.render('signin');
});
router.get('/auth', function(req, res, next) {
  res.render('auth', {title: 'Not Authorised'});

});
router.get('/logout', function(req, res, next) {
    req.logout();
    // req.session.destroy();
    // res.render('signin');
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
});

router.get('/profile', function(req, res, next) {

        if(req.user.type == 'Customer'){
            res.redirect('/customerprofile');
        }
        if(req.user.type == 'Receptionist'||req.user.type == 'Trainer'||req.user.type == 'Maintenance'||req.user.type == 'Manager'){
            res.redirect('/empprofile');
        }
    
});
router.get('/customerprofile', function(req, res, next) {
      if(req.user.type == 'Customer'){
        console.log(user.cust_id);
        res.render('customerprofile', {user: user},)
      }
});
router.get('/empprofile', function(req, res, next) {
      if(req.user.type == 'Receptionist'||req.user.type == 'Trainer'||req.user.type == 'Maintenance'||req.user.type == 'Manager'){
        console.log(user.emp_id);
        res.render('empprofile', {user: user},)
      }
});
// router.post('/signin',
//   passport.authenticate('local'),
//  {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     //console.log(req.user);
//     //req.flash('Success!');
//     res.redirect('/');
//   });
router.post('/signin', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/signin' }));


passport.use(new LocalStrategy(function(username, password, done){
        //console.log(username);
        //console.log(password); 

        const db = require('../db.js');

        //console.log('1');

        db.query('SELECT * FROM users WHERE user_id = ? ', [username],
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
                        results[0].password = 0;
                        //console.log(results[0].password);
                        if(results[0].type == 'Customer'){
                        getcustdata(username);
                        }
                        else if(results[0].type == 'Receptionist'||results[0].type == 'Trainer'||results[0].type == 'Maintenance'||results[0].type == 'Manager'){
                        getempdata(username);
                        }
                        return done(null,results[0]);
                    }
                });
            }//return done(null, 'asd');    
        })
    }
));

// passport.serializeUser(function(user_id, done) {
//   done(null, user_id);
// });

// passport.deserializeUser(function(user_id, done) {
//     done(null, user_id);
// });
function getcustdata(username){

        const db = require('../db.js');

        //console.log('1');

        db.query('SELECT * FROM customer WHERE cust_id = ? ', [username],
            function(err, results, fields){
                if(err) {return done(err)};

                if(!results.length){
                    return done(null, false /*,req.flash('loginMessage', 'No user found')*/);
                } else{
                //var r = results[0].toObject();
                var r = JSON.parse(JSON.stringify(results[0]));
                r.job = 'Customer';
                user = r;
                }   
        })
}

function getempdata(username){

        const db = require('../db.js');

        //console.log('1');

        db.query('SELECT * FROM employee WHERE emp_id = ? ', [username],
            function(err, results, fields){
                if(err) {return done(err)};

                if(!results.length){
                    return done(null, false /*,req.flash('loginMessage', 'No user found')*/);
                } else{
                console.log('Emp user taken');
                user = results[0];
                }   
        })
}

    

module.exports = router;


function authenticationMiddleware() {  
    return (req, res, next) => {
        //console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/signin')
    }
}
