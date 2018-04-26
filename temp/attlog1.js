var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    if(req.user.type=='Receptionist'){
        res.render('attlog',{flash : req.flash('Plis')});
    }else{
        res.redirect('auth');
    }
});

router.post('/', function(req, res, next){
    const userid = req.body.userid;
    const date = req.body.date;
    const place = req.body.sub;
    const db = require('../db.js');
    db.query("SELECT * FROM customer c, subscription s WHERE c.sub_id=s.sub_id AND c.cust_id = ? ", 
        [userid], function(err, rows, fields){
            var grant = 0;
            if(err||rows.length==0){
                req.flash('Plis', 'User Id Does Not Exist');
                res.redirect('\attlog');
            }else{
                if(rows[0].sub_gym==1&&place=='Gym')
                    grant = 1;
                else if(rows[0].sub_ab==1&&place=='Aerobics')
                    grant = 1;
                else if(rows[0].sub_kb==1&&place=='Kick Boxing')
                    grant = 1;
                else if(rows[0].sub_py==1&&place=='Power Yoga')
                    grant = 1;
                if(grant){
                    const db1 = require('../db.js');
                    db1.query("INSERT INTO attendancet values(?,?,?);", [date,userid, place], function(error, results, fields){
                        if(error){
                            console.log(error.message+ error.sqlMessage);
                            console.log('SQL Error');
                            req.flash('Plis', 'Already Entered');
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
            }
    });
});

module.exports = router;