var express = require('express');
var app = express();

// para poder mandar dados para o angualr
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header",
     "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    console.log("Headers funionando");
    next();
});


app.get('/teste', function (req, res, next) {
    res.status(200).json({
        "msg" : "mensagem"
    });
});


module.exports = app;