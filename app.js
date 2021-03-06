var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;
var cors = require('cors');
var users = require('./routes/users');
var books = require('./routes/sitios');
var reservas = require('./routes/reservas')
var app = express();

app.use(cors());

let dbMongo;
mongodb.connect("mongodb://sebas:123@ds161574.mlab.com:61574/libreria" , (err, db)=>{
    if(err){
        console.log("Error al conectarse a mongo");
    }
    dbMongo = db;
});

app.use((req,res,next)=>{
    req.db = dbMongo;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/users', users);
app.use('/sitios', books);
app.use('/reservas', reservas)

module.exports = app;
