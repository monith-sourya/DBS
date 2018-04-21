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

/* GET home page. */

router.get('/', authenticationMiddleware(),function(req, res, next) {

    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.render('signin');
});


router.post('/signin',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.end("Success"+ req.user.username);
  });

// passport.serializeUser(function(user_id, done) {
//   done(null, user_id);
// });

// passport.deserializeUser(function(user_id, done) {
//     done(null, user_id);
// });


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


function authenticationMiddleware() {  
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/newuser')
    }
}
