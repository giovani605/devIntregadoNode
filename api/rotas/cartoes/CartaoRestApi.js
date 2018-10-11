"use strict"

const express = require('express');
const router = express.Router();
var banco = require("../../../model/bancoDados");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/",(req, res, next) => {
    res.send("ok");
});
router.get("/user/:id",(req, res, next) => {
    banco.buscarCartoesUsuario(req.params.id,(dados) => {
        res.status(200).send({
            "mensagem" : "ok",
            "dados" : dados
        })

    });
});

module.exports = router;