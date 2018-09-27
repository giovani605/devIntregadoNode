var express = require('express');
var app = express();
var bancoDados = require("./bancoDados");

app.get('/teste',function(req,res){
    console.log("teste funcionando");
    res.status(200).send("oi");
})
app.listen(3000,function(){
    console.log("Servidor rodando");
});