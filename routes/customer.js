var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

router.get('/customer', function(req, res, next){
    res.render('customer', {title: 'Customer Entry'});
})

router.post('/customer', function(req, res, next){
    res.render(JSON.stringify(req));
})

module.exports = router; 