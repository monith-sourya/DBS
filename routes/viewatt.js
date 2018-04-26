var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    const attp = 0;
    const db = require('../db.js');
    try{
        const userid = req.user.user_id;
        db.query('SELECT * FROM attendancet where person_id = ? ORDER BY time ASC',[userid],function(err, rows, fields){
            if(err){
                console.log(JSON.stringify(err));
                row = rows;
                req.flash('Resp', 'SQL Error');
                res.redirect('/viewatt');
            }
            else{
                console.log('SQL Query Succesful');
            }
            const user = req.user;
            res.render('viewatt',{title: 'View Attendance', flash : req.flash('Resp'), rows: rows, user : user});
        });
    }catch(err){
        req.flash('err1', 'Please Signin');
        res.redirect('/signin');
    }
});

module.exports = router;