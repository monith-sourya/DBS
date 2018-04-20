 var mysql = require('mysql');

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'Keyshore',
    database: 'fitness'
});

connect.connect();

connect.connect(function(error){
        if(error){
            console.log('Error in sql');
        }
        else{
            console.log('Connected to sql');
        }
});

module.exports = connect;