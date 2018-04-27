var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var moment = require('current-date');
router.get('/', function(req, res, next){
    if(req.user.type=='Customer'){
        const db = require('../db.js');
        const row ;
        const count;
        const curr = '2018/04/25';
        db.query('SELECT * FROM attendancet where person_id = ? ORDER BY ASC',[req.user.userid],function(err, rows, fields){
            if(err){
                console.log(JSON.stringify(err));
                req.flash('Resp', 'SQL Error');
                res.redirect('/viewatt');
            }
            else{
                console.log('SQL Query Succesful');
                count = rows.length;
                curr.split('/');
                //if(curr[0])
                row = rows;
            }
        })
        res.render('attlog',{title: 'View Attendance', flash : req.flash('Resp'), row: row});
    }else{
        res.redirect('auth');
    }
});

module.exports = router;