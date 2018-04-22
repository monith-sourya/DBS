var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/reroute', function(req, res){
    res.redirect('/attlog');
})

module.exports = router;