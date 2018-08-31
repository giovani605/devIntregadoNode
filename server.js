var express = require('express');
var app = express();

app.get('/teste',function(req,res){
    console.log("teste funcionando");
    res.status(200).send("oi");
})
app.listen(3000,function(){
    console.log("oiii");
});