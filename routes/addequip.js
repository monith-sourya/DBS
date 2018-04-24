var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/',function(req, res, next) {
    res.redirect('/modifyequip');
});
router.post('/', function(req, res, next) {

	const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;

        

    const db = require('../db.js');


    db.query("INSERT INTO inv_equip SET type_name=?, price =?;",[name, price],
    function(err, result, fields){
        if(err){
        console.log(err)
        console.log(err)

        req.flash('SQL', ' Error in Adding. Please Try again')
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