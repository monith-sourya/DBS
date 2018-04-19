var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
//router.use(bodyParser());


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  res.end(req.username); 

});

module.exports = router;
