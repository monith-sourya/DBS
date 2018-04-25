var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var rows;
var user;
// var bal;

router.get('/',function(req, res, next){
    const db = require('../db.js');

    var x = 0;
	var rows, user;
    db.query('SELECT inv_id, inv_name, sp, stock FROM inv_food WHERE stock > 0',
        function(err, results, fields){
            if(err) {throw (err);}else{
            //var r = results[0].toObject();
            rows = results;
            res.render('addt', { title: 'Equipment Inventory ', rows : rows, flash : req.flash('SQL')});
        	}
    });

    // db.query('SELECT cust_id, cust_name, card_bal FROM customer WHERE cust_id=?;', [req.user.user_id], 
    //     function(err, results, fields){
    //         if(err) {throw (err)};

    //    	user = JSON.parse(JSON.stringify(results[0]));
    //    	//console.log(user);
    //    	x= 1;

    // res.render('addt', { title: 'Equipment Inventory ', rows : rows, user : user, flash : req.flash('SQL')});
    // });
    //res.render('addt', { title: 'Equipment Inventory ', rows : rows, user : user, flash : req.flash('SQL')});
});

router.post('/', function(req, res, next) {

	//console.log(req.body);
	const userid = req.user.user_id;
	const invid = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;

    


    //console.log('READ THIS FIRST'+price);

    const cost = price * quantity;

    const db = require('../db.js');

    // db.query('SELECT card_bal FROM customer WHERE cust_id=?',[userid],
    //     function(err, results, fields){
    //         if(err) {throw (err)};
    //         //var r = results[0].toObject();
    //         var bal= JSON.parse(JSON.stringify(results[0]));
    //         console.log(bal);
    // });

    // console.log('current balance is '+bal);

    db.query(" START TRANSACTION ;",
    function(err, result, fields){
        if(err){
        console.log(err);
       	req.flash('SQL', 'Error in creating savepoint');
        res.redirect('addt');
    	}
    	else{
    	db.query("INSERT INTO transaction (t_id, cust_id, inv_id, price, quant) VALUES (NULL, ?, ?, ?, ?);", [userid, invid, price, quantity],
    	function(err, result, fields){
        if(err){
        console.log(err);

        db.query(" ROLLBACK ;",
    	function(err, result, fields){
		    if(err){
		    console.log(err);
			}
    	})

       	req.flash('SQL', 'Error in Adding Transaction. ');
        res.redirect('addt');
    	}
    	else{


    		    db.query("UPDATE customer SET card_bal = card_bal - ? WHERE cust_id = ? ;", [cost, userid],
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

			   	req.flash('SQL', 'Insufficient Balance');
			    res.redirect('addt');
				}
		    	else{
		    	    db.query("UPDATE inv_food SET stock= stock - ? WHERE inv_id = ? AND stock >= ?;", [quantity, invid, quantity],
					    function(err, result, fields){
					        if(err){
					        console.log(err);

					        db.query(" ROLLBACK ;;",
					    	function(err, result, fields){
							    if(err){
							    console.log(err);
								}
								// else{
								// res.redirect('addt');
								// }
					    	})

					       	req.flash('SQL', 'Insufficient Quantity');
					        res.redirect('addt');
					    	}
					    	else{

					    		db.query(" COMMIT;",
						    	function(err, result, fields){
								    if(err){
								    console.log(err);
									}
						    	})
					    		req.flash('SQL', 'Purchase Successful')
					    		res.redirect('addt');	
					    	}
			    		})
    				}
    			})
    	}
    })
    	}
    })


   //  db.query("UPDATE inv_food SET stock= stock - ? WHERE inv_id = ? AND stock >= ?;", [quantity, invid, quantity],
   //  function(err, result, fields){
   //      if(err){
   //      console.log(err);
        
   //      db.query(" ROLLBACK TO NOW;",
   //  	function(err, result, fields){
		 //    if(err){
		 //    console.log(err);
			// }
			// // else{
			// // res.redirect('addt');
			// // }
   //  	})
       	
   //     	req.flash('SQL', 'Insufficient Quantity');
   //      res.redirect('addt');
   //  	}
   //  	// else{
   //  	// res.redirect('addt');
   //  	// }
   //  })
});


module.exports = router;