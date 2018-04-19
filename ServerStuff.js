//import { WSAEPFNOSUPPORT } from "constants";


var mysql = require("mysql");
var express = require("express");
var app = express();

var http = require('http');
var fs = require('fs');

function send404Response(response){
     response.writeHead(404, {"Context-Type": "text/plain"});
     response.write("Error 404: Page Not Found!!");
     response.end();
}

function onRequest(request, response){
    if(request.method == 'GET' &&  request.url == '/'){
        response.writeHead(200, {"Context-Type": "text/html"});
        fs.createReadStream("./xd.html").pipe(response);
    }else{
        send404Response(response);
    }
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


app.listen()

