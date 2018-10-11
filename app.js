var express = require('express');
var app = express();

var contas = require("./api/rotas/contas/ContasREST");
var cartoes = require("./api/rotas/cartoes/CartaoRestApi");
var auth = require("./api/rotas/auth/AuthREST");

// para poder mandar dados para o angualr
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next()
    console.log("Headers funcionando");
    next();
});


app.use('/contas', contas);
app.use('/cartoes', cartoes);
app.use('/auth', auth);


module.exports = app;