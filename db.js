var mysql = require('mysql');

var connect = mysql.createConnection({
<<<<<<< HEAD

    host: '192.168.0.13',
=======
    host: 'localhost',
>>>>>>> 9f00d2b6c23d8d2ee1942b1c120c91938be1283a
    //port: '80', 
    user: 'sanjay',
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