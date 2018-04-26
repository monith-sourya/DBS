var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/',function(req, res, next) {
    const db = require('../db.js');

    //var inv ;
    try{
        if(req.user.type == 'Maintenance'){
            db.query('SELECT * FROM inv_food',
                function(err, results, fields){
                    if(err) {throw (err)};
                    //var r = results[0].toObject();
                    var rows = results;  
                    //console.log(rows);
                    const user = req.user;
                    res.render('modifyi', { title: 'Food Inventory',rows : rows, flash : req.flash('SQL'), user: user});
            });
        }
        else{
            res.redirect('auth');
        }
    }catch(err){
        req.flash('SQL', 'SQL Error in Inv_Food');
        res.render('modifyi', { title: 'Food Inventory',rows : rows, flash : req.flash('SQL')});
    }    
});

router.post('/', function(req, res, next) {
	const id = req.body.id;
    const name = req.body.name;
    //const cp = req.body.cp;
    const sp = req.body.sp;
    const stock = req.body.stock;
    const db = require('../db.js');
    db.query("UPDATE inv_food SET inv_name=?, sp=?,stock=? WHERE inv_id = ?;",[name, sp, stock,id ],
    function(err, result, fields){
        if(err){
        console.log(err)

        req.flash('SQL', 'There exists a duplicate, please verify again.');
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