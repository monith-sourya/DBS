var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    if(req.user.type=='Receptionist'){
        console.log('Succesfully Entered Frontend');
        res.render('attlog',{flash : req.flash('Plis')});
    }else{
        res.redirect('auth');
    }
});

router.post('/', function(req, res, next){
    console.log('Entered Post');
    const userid = req.body.userid;
    const date = req.body.date;
    const place = req.body.sub;
    const db = require('../db.js');
    console.log('Befor SQL Error');
    db.query("SELECT * FROM customer c, subscription s WHERE c.sub_id=s.sub_id AND c.cust_id = ? ", 
        [userid], function(err, rows, fields){
            if(err){
                error = err;
                console.log(err.sqlMessage);
            }
            if(rows[0].sub_gym==1&&place=='Gym')
                grant = 1;
            else if(rows[0].sub_ab==1&&place=='Aerobics')
                grant = 1;
            else if(rows[0].sub_kb==1&&place=='Kick Boxing')
                grant = 1;
            else if(rows[0].sub_py==1&&place=='Power Yoga')
                grant = 1;
            console.log(JSON.stringify(rows[0].sub_ab)+place+grant);
            if(grant){
                const db1 = require('../db.js');
                db1.query("INSERT INTO attendancet values(?,?,?);", [date,userid, place], function(error, results, fields){
                    if(error){
                        console.log(error.message+ error.sqlMessage);
                        console.log('SQL Error');
                        req.flash('Plis', JSON.stringify(error.sqlMessage));
                        res.redirect('/attlog');
                    }
                    else{
                        console.log("Query Worked and Changed Variables");
                        req.flash('Plis', 'Successfully Added');
                        res.redirect('/attlog');
                    }
                });
            }else{
                req.flash('Plis', 'Access Denied Check Subscription');
                res.redirect('/attlog');
            }
    });
});

function checkSub(userid, place, callback){
        var grant = 0;
        var error;
        const db = require('../db.js');
        db.query("SELECT * FROM customer c, subscription s WHERE c.sub_id=s.sub_id AND c.cust_id = ? ", 
        [userid], function(err, rows, fields){
            if(err){
                error = err;
                console.log(err.sqlMessage);
            }
            console.log(JSON.stringify(rows[0].sub_gym)+place);
            if(rows[0].sub_gym==1&&place=='Gym')
                grant = 1;
            else if(rows[0].sub_ab==1&&place=='Aerobics')
                grant = 1;
            else if(rows[0].sub_kb==1&&place=='Kick Boxing')
                grant = 1;
            else if(rows[0].sub_py==1&&place=='Power Yoga')
                grant = 1;
            console.log(grant);
        })
        console.log(grant);
        callback(error, grant);
}

module.exports = router;