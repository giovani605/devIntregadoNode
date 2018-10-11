"use strict"

const express = require('express');
const router = express.Router();
var banco = require("../../../model/bancoDados");
// nesse arquivo fica a rota que lida com os cartoes
router.get("/", (req, res, next) => {
    console.log("ola");
    res.send("ok");
});
router.post("/login", (req, res, next) => {
    let dados = req.body;
    console.log("Tentando login" + JSON.stringify(dados));
    banco.buscarUsuario(dados.user, (usuario) => {
        console.log("asdsad" + usuario.senha);
        if (usuario.senha == dados.senha) {
            console.log("login sucessido");
            res.status(200).json({
                "loginFlag" : true,
                "mensagem": "login sucessfull",
                "token": "gerar depois",
                "User" : usuario
            });
        } else {
            console.log("login falho" );
            res.status(200).json({
                "loginFlag" : false,
                "mensagem": "login falho"
            });
        }
    });
});


module.exports = router;