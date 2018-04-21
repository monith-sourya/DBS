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


var user;
/* GET home page. */

router.get('/', authenticationMiddleware(),function(req, res, next) {
    res.render('index', { title: user.cust_id });
});


router.get('/signin', function(req, res, next) {
  res.render('signin');
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
        if(req.user.user_id<9000){
            res.redirect('/customerprofile');
        }
    
});
router.get('/customerprofile', function(req, res, next) {
      if(req.user.user_id < 9000){
        console.log(user.cust_id);
        res.render('customerprofile', {user: user},)
      }
});

router.post('/signin',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //console.log(req.user);
    //req.flash('Success!');
    res.redirect('/');
  });


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
                        getuserdata(username);
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
function getuserdata(username){

        const db = require('../db.js');

        //console.log('1');

        db.query('SELECT * FROM customer WHERE cust_id = ? ', [username],
            function(err, results, fields){
                if(err) {return done(err)};

                if(!results.length){
                    return done(null, false /*,req.flash('loginMessage', 'No user found')*/);
                } else{
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
