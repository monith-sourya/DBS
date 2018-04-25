var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/',function(req, res, next) {
    const db = require('../db.js');

    //var inv ;

    const userid = req.user.user_id;

    db.query('SELECT * FROM transaction INNER JOIN inv_food ON transaction.inv_id= inv_food.inv_id WHERE cust_id=? ORDER BY time DESC',[userid],
        function(err, results, fields){
            if(err) {throw (err)};
            //var r = results[0].toObject();
            var rows = results;  
            //console.log(rows);

    		res.render('viewt', { title: 'Transaction History',rows : rows});
    })    
});


module.exports = router;