var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');



router.get('/',function(req, res, next) {
    const db = require('../db.js');

    //var inv ;

    db.query('SELECT * FROM inv_food',
        function(err, results, fields){
            if(err) {throw (err)};
            //var r = results[0].toObject();
            var rows = results;  
            //console.log(rows);

    		res.render('modifyi', { title: 'Food Inventory',rows : rows, flash : req.flash('Duplicate')});
    })    
});

router.post('/', function(req, res, next) {

	const id = req.body.id;
    const name = req.body.name;
    const cp = req.body.cp;
    const sp = req.body.sp;
    const stock = req.body.stock;

        

    const db = require('../db.js');


    db.query("UPDATE inv_food SET inv_name=?, cp =?, sp=?,stock=? WHERE inv_id = ?;",[name, cp, sp, stock,id ],
    function(err, result, fields){
        if(err){
        console.log(err)

        req.flash('Duplicate', 'There exists a duplicate, please verify again.');
        res.redirect('modifyi');
    	}

    	else{
    	res.redirect('modifyi');
        //res.render('modifyi', { title: 'Food Inventory',rows : rows, errors: 'None'});
    	}
    })
    //res.end(JSON.stringify(req.body));

});

module.exports = router;


module.exports = router;