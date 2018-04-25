var mysql = require('mysql');

var connect = mysql.createConnection({
<<<<<<< HEAD
    host: '192.168.0.13',
    user: 'sanjay',
=======
    host: 'localhost',
    //port: '80', 
    user: 'root',
>>>>>>> 02dcd5e1e04fd435866e60dde39cb83823c01312
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