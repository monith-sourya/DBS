var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.get('/', function(req, res, next){
    if(req.user.type == 'Manager'){
        const db = require('../db.js')
        var stats = {capital : 0, dep_cap: 0, earn: 0, exp: 0, sub: 0, cb: 0};
        db.query('Select price,status from inv_equip', function(err, rows, fields){
            if(err){
                console.log(err);
            }
            else{
                for(var i =0; i<rows.length; i++){
                    stats.capital += rows[i].price;
                    stats.dep_cap += rows[i].price*(10-rows[i].status)/10;
                }
                console.log(stats.capital+' '+stats.dep_cap);
                const db1 = require('../db.js');
                db1.query('Select * from transaction t, inv_food invf where t.inv_id = invf.inv_id', function(err, rows, fields){
                    if(err){
                        console.log(err);
                    }
                    else{
                        for(var i=0; i<rows.length; i++){
                            stats.earn += rows[i].price*(rows[i].quant);
                            stats.exp += rows[i].cp*(rows[i].quant);
                        }
                        console.log(stats.earn+' '+stats.exp);
                        const db2 = require('../db.js');
                        db2.query('Select * from subscription s, customer c where c.sub_id=s.sub_id',function(err, rows, fields){
                            if(err){
                                console.log(err);
                            }
                            else{
                                for(var i=0; i<rows.length; i++){
                                    stats.sub+= rows[i].sub_price;
                                    stats.cb += rows[i].card_bal;
                                }
                                console.log(stats.sub+' '+stats.cb);
                                res.render('stats', {flash: '', stats: stats})
                            }
                        })
                    }
                })
            }
        })
    }
    else{
        res.redirect('auth');
    }
})


module.exports = router;