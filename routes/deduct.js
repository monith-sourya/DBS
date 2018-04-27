var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');


router.get('/',function(req, res, next) {
    const db = require('../db.js');

    //var inv ;
    try{
        const userid = req.user.user_id;
        if(req.user.type=='Manager'){
            db.query('SELECT * FROM transaction INNER JOIN inv_food ON transaction.inv_id= inv_food.inv_id WHERE cust_id=? ORDER BY time DESC',[userid],
                function(err, results, fields){
                    if(err) {throw (err)};
                    //var r = results[0].toObject();
                    var rows = results;  
                    //console.log(rows);
                    // const user = req.user;
                    res.render('viewt', { title: 'Transaction History',rows : rows});
            })
        }else{
            res.redirect('auth');
        }
    }catch(err){
        req.flash('err1', 'PLease Signin');
        res.redirect('/signin');
    }    
});


router.post('/', function(req, res, next) {

    const id = req.body.userid;
    const amt = req.body.amt;

    const db = require('../db.js');


    // db.query("UPDATE customer SET card_bal= card_bal + ? WHERE cust_id = ?;",[ amt,id ],
    // function(err, result, fields){
    //     if(err){
    //     console.log(err)

    //     req.flash('SQL', 'Error in updating');
    //     res.redirect('balance');
    //     }
    //     else if(result.affectedRows==0){
    //         req.flash('SQL', 'Error user not found');
    //         res.redirect('balance');
    //     }
    //     else{
    //     req.flash('SQL', 'Added Successfully');
    //     res.redirect('balance');
    //     //res.render('modifyi', { title: 'Food Inventory',rows : rows, errors: 'None'});
    //     }
    // })
    // //res.end(JSON.stringify(req.body));

    db.query(" START TRANSACTION ;",
    function(err, result, fields){
        if(err){
        console.log(err);
        req.flash('SQL', 'Error in creating savepoint');
        res.redirect('deduct');
        }
        else{
        db.query("UPDATE customer SET card_bal= card_bal + ? WHERE cust_id = ?;",[ amt,id ],
        function(err, results, fields){
        if(err){
        console.log(err);

        db.query(" ROLLBACK ;",
        function(err, result, fields){
            if(err){
            console.log(err);
            }
        })

        req.flash('SQL', 'Error in updating balance');
        res.redirect('balance');
        }
        else{
           db.query("INSERT INTO balance (t_id, cust_id, credit, debit) VALUES (NULL, ?, ?, 0);", [id, amt],
                function(err, result, fields){
                        if(err){
                        console.log(err);

                        db.query(" ROLLBACK;",
                        function(err, result, fields){
                            if(err){
                            console.log(err);
                            }
                            // else{
                            // res.redirect('addt');
                            // }
                        })

                req.flash('SQL', 'User does Not exist!');
                res.redirect('balance');
                }else{

                    db.query(" COMMIT;",
                    function(err, result, fields){
                        if(err){
                        console.log(err);
                        }
                    })
                    req.flash('SQL', 'Purchase Successful')
                    res.redirect('balance');   
                }
            })
        }
    })
        }
    })
});

module.exports = router;