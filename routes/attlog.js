var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    try{
        if(req.user.type=='Receptionist'){
            //const user = req.user;
            const db = require('../db.js');
            const cust_id = req.flash('id');
            if(req.flash('disp').length>0){
                db.query('SELECT * FROM customer WHERE cust_id = ? ', [cust_id],
                    function(err, results, fields){

                        if(err) {console.log(err);}

                        if(!results.length){
                            //return done(null, false /*,req.flash('loginMessage', 'No user found')*/);
                            res.redirect('signin');
                        } else{
                        //var r = results[0].toObject();
                            var r = JSON.parse(JSON.stringify(results[0]));
                            r.job = 'Customer';
                            user = r;
                            user.password = 0;
                            x = user;
                            console.log(x+req.flash('disp').length);
                            //console.log(x);
                            res.render('attlog',{flash : req.flash('Plis'), disp : req.flash('disp'), cust: x, moderr: req.flash('moderr')});
                        }   
                })
            }else{
                res.render('attlog',{flash : req.flash('Plis'), disp : req.flash('disp'), cust: '', err: req.flash('err'), moderr: ''});
            }
        }else{
            res.redirect('auth');
        }
    }catch(err){
        req.flash('err1', 'Please Sign in');
        res.redirect('/signin');
    }
});

router.post('/', function(req, res, next){
    const userid = req.body.userid;
    const date = req.body.date;
    const place = req.body.sub;

    req.checkBody('userid', 'User ID is required').notEmpty();
    req.checkBody('date', 'Date is Required').notEmpty();
    req.checkBody('sub', 'Choose a Place').notEmpty();
    let errors = req.validationErrors();
    if(errors){
        req.flash('Plis', 'Dont leave fields empty');
        res.redirect('/attlog');
    }
    else{
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
                                req.flash('disp', 'Display')
                                req.flash('id', userid);
                                res.redirect('/attlog');
                            }
                        });
                    }else{
                        req.flash('Plis', 'Access Denied Check Subscription');
                        res.redirect('/attlog');
                    }
                }
        });
    }
});

module.exports = router;