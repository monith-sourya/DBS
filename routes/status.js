var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');



router.get('/',function(req, res, next) {
    const db = require('../db.js');

    //var inv ;
    try{
        db.query('SELECT * FROM inv_equip',
            function(err, results, fields){
                if(err) {throw (err)};
                //var r = results[0].toObject();
                var rows = results;  
                //console.log(rows);
                const user = req.user;
                res.render('status', { title: 'Status Updation',rows : rows, flash : req.flash('SQL'), user: user});
        })
    }catch(err){
        req.flash('err1', 'PLease Signin');
        res.redirect('/signin');
    }    
});

router.post('/', function(req, res, next) {

	const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const status = req.body.status;
    const db = require('../db.js');
    db.query("UPDATE inv_equip SET status=? WHERE type_id = ?;",[status, id ],
    function(err, result, fields){
        if(err){
        console.log(err)

        req.flash('SQL', 'Error in Modifying');
        res.redirect('status');
    	}

    	else{
    	res.redirect('status');
        //res.render('modifyi', { title: 'Food Inventory',rows : rows, errors: 'None'});
    	}
    })
    //res.end(JSON.stringify(req.body));

});

module.exports = router;