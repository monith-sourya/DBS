var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    if(req.user.type=='Receptionist'){
        res.render('attlog',{errors:'No Errors'});
    }else{
        res.redirect('auth');
    }
});

router.post('/', function(req, res, next){
    const userid = req.body.userid;
    const db = require('../db.js');
    if(doesExist(userid)){
        db.query("Select COUNT(*) from attendance where person_id =?;", [userid], function(err, results, fields){

        });
    }
});

function doesExist(userid){
    return (err, exist) => {
        const db = require('../db.js');
        db.query("SELECT * FROM customer where cust_id=?;",[userid],function(err, results, fields){  
            if(!results.length){
                exist = false;
            }
            else{
                exist = true;
            }
        });
    }
}

module.exports = router;