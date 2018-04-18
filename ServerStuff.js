//import { WSAEPFNOSUPPORT } from "constants";


var mysql = require("mysql");
var express = require("express");
var app = express();

var http = require('http');

function onRequest(request, response){
    console.log("User Request" + request.url);

    response.writeHead(200, {"Context-Type":"text/plain"});

    response.write("Here is your response");

    response.end();
}

http.createServer(onRequest).listen(8888);
console.log('Server Running Successfully');


var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : 'Keyshore',
    database: 'fitness'
});

connect.connect(function(error){
    if(error){
        console.log('Error');
    }
    else{
        console.log('Connected');
    }

    connect.query("Select * from customer", function(err, result, fields){
        if(err) throw err;

        console.log(result);
    });
});


// app.get('/', function(req, resp){
//     // about mysql
//     connect.query("Select * from wingmates", function(error, rows, fields){
//         if(!!error){
//             console.log('Error Wrong Query');
//         } else {
//             console.log('Successful Query');
//         }
//     });
// });

app.listen()

