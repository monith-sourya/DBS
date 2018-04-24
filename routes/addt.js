var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


var rows;
var user;

router.get('/',function(req, res, next) {
    const db = require('../db.js');

    db.query('SELECT inv_id, inv_name, sp, stock FROM inv_food WHERE stock > 0',
        function(err, results, fields){
            if(err) {throw (err)};
            //var r = results[0].toObject();
            rows = results;
    });

     db.query('SELECT cust_id, cust_name, card_bal FROM customer WHERE cust_id=?;', [req.user.user_id], 
        function(err, results, fields){
            if(err) {throw (err)};

        user = JSON.parse(JSON.stringify(results[0]));

        console.log(user);
    });
    console.log(user);
    res.render('addt', { title: 'Equipment Inventory ', rows : rows, user : user, flash : req.flash('SQL')});
});

router.post('/', function(req, res, next) {

	const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;

        

    const db = require('../db.js');


    db.query("UPDATE inv_equip SET type_name=?, price =? WHERE type_id = ?;",[name, price, id ],
    function(err, result, fields){
        if(err){
        console.log(err)

        req.flash('SQL', 'Error in Modifying');
        res.redirect('modifyequip');
    	}

    	else{
    	res.redirect('modifyequip');
        //res.render('modifyi', { title: 'Food Inventory',rows : rows, errors: 'None'});
    	}
    })
    //res.end(JSON.stringify(req.body));

});


module.exports = router;