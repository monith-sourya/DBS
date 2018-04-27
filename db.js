var mysql = require('mysql');

var connect = mysql.createConnection({

    host: '192.168.0.5',
    //port: '80', 
<<<<<<< HEAD
    user: 'vishnu',
=======
    user: 'nikki',
>>>>>>> 4cf9a5067e8cba65cab0a19718ec89d7fa8f1fa2
    password : 'Keyshore',
    database: 'fitness'
});

//connect.connect();

connect.connect(function(error){
        if(error){
            console.log('Error in sql');
            console.log(error);
        }
        else{
            console.log('Connected to sql');
        }
});

module.exports = connect;