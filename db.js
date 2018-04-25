var mysql = require('mysql');

var connect = mysql.createConnection({

    host: 'localhost',
    //port: '80', 
    user: 'root',
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