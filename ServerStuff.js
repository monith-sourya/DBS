import { WSAEPFNOSUPPORT } from "constants";

var mysql = require("mysql");
var express = require("express");
var app = express();

console.log("Hello World");

var connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password = 'lescrutes@98',
    database: 'sample'
});

connect.connect(function(error){
    if(error){
        console.log('Error');
    }
    else{
        console.log('Connected');
    }
});

app.get('/', function(req, resp){
    // about mysql
    connect.query("Select * from sample", function(error, rows, fields){
        if(!!error){
            console.log('Error Wrong Query');
        } else {
            console.log('Successful Query');
        }
    });
});

app.listen()

