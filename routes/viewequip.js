var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');



router.get('/',function(req, res, next) {
    const db = require('../db.js');

    //var inv ;

    db.query('SELECT * FROM inv_equip',
        function(err, results, fields){
            if(err) {throw (err)};
            //var r = results[0].toObject();
            var rows = results;  
            //console.log(rows);

    		res.render('viewequip', { title: 'Equipment Inventory',rows : rows});
    })    
});

module.exports = router;