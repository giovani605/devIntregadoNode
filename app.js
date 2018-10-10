var express = require('express');
var app = express();

var contas = require("./api/rotas/contas/ContasREST");
var cartoes = require("./api/rotas/cartoes/CartaoRestApi");

// para poder mandar dados para o angualr
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header",
     "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    console.log("Headers funionando");
    next();
});


app.use('/contas', contas);
app.use('/cartoes', cartoes);


module.exports = app;