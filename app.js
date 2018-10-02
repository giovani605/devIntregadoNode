var express = require('express');
var app = express();

app.get('/teste',function(req,res,next){
    console.log("teste funcionando");
    res.status(200).send("oi");
});

app.use(function(req,res,next){
    console.log("teste funcionando");
    res.status(200).send("oi");
});

module.exports = app;