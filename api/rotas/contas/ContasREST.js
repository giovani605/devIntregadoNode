"use strict"

const express = require('express');
const router = express.Router();

var banco = require("../../../model/bancoDados")
// nesse arquivo fica a rota que lida com os cartoes
router.get("/", (req, res, next) => {
    console.log("oisse");
    var dados = banco.queryTeste((dados) => {
        console.log(dados);
        res.send(dados);
    });



});

module.exports = router;