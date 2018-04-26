var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/',function(req, res, next) {
    const db = require('../db.js');

    //var inv ;
    try{
        const userid = req.user.user_id;
        if(req.user.type=='Customer'){
            db.query('SELECT * FROM balance WHERE cust_id=? ORDER BY time DESC',[userid],
                function(err, results, fields){
                    if(err) {throw (err)};
                    //var r = results[0].toObject();
                    var rows = results;  
                    //console.log(rows);
                    // const user = req.user;
                    res.render('viewcard', { title: 'Transaction History',rows : rows});
            })
        }else{
            res.redirect('auth');
        }
    }catch(err){
        req.flash('err1', 'PLease Signin');
        res.redirect('/signin');
    }    
});


module.exports = router;