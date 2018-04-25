var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var errj=  "No Error"

router.get('/', function(req, res, next){
    if(req.user.type=='Receptionist'){
        console.log('Succesfully Entered Frontend');
        res.render('attlog',{errors: errj, disp: false});
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
    console.log('before function Error');
    if(doesExist(userid)){
        console.log('Befor SQL Error');
        db.query("INSERT INTO attendancet values(?,?,?);", [date,userid, place], function(err, results, fields){
            var dispj = false;
            var resp ;
            if(err){
                console.log(error.message+ error.sqlMessage);
                console.log('SQL Error');
                errj = err;
            }
            else{
                console.log("Query Worked and Changed Variables");
                dispj = true;
                //resp = returnRows(userid);
            }
            res.render('attlog', {errors: errj, disp: dispj});
        });
    }
    else{
        res.render('/error', {message: "User Does Not Exist", error: {status: '101' , stack: "User ID Does Not Exist"}})
    }
});

function returnRows(userid){
    return (res) => {
        const db = require('../db.js');
        db.query("SELECT * FROM attendancet where person_id=?;",[userid],function(err, results, fields){  
            res = results;
        });
    }
}

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

function checkSub(userid, place){
    return (errj, grant) => {
        const db = require('../db.js');
        db.query("SELECT * FROM customer c, subscription s WHERE c.sub_id=s.sub_id AND c.cust_id = ? ", 
        [userid], function(err, rows, fields){
            if(err){
                errj = err;
            }
            if(rows[0].sub_gym==1&&place=='Gym')
                grant = 1;
            else if(rows[0].sub_ab==1&&place=='Aerobics')
                grant = 1;
            else if(rows[0].sub_kb==1&&place==)
                grant = 1;
            else if(rows[0].sub_py==1)
                grant = 1;
        })
    }
}

module.exports = router;