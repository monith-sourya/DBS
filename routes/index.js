var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* GET home page. */

router.get('/', authenticationMiddleware(),function(req, res, next) {

    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('index', { title: 'Express' });
});
router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.render('signin');
});
module.exports = router;

function authenticationMiddleware() {  
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();
        res.redirect('/newuser')
    }
}
