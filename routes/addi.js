var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/',function(req, res, next) {
    res.redirect('/modifyi');
});
router.post('/', function(req, res, next) {

	const id = req.body.id;
    const name = req.body.name;
    const cp = req.body.cp;
    const sp = req.body.sp;
    const stock = req.body.stock;

        

    const db = require('../db.js');


    db.query("INSERT INTO inv_food SET inv_name=?, cp =?, sp=?,stock=?;",[name, cp, sp, stock],
    function(err, result, fields){
        if(err){
        console.log(err)
        console.log(err)

        req.flash('Duplicate', 'There exists a duplicate, please verify again.')
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