"use strict"

const express = require('express');
const router = express.Router();
// nesse arquivo fica a rota que lida com os cartoes
router.get("/",(req, res, next) => {
    console.log("ola");
    res.send("ok");
});
router.post("/",(req, res, next) => {
    console.log("ola");
    res.send({
        "mensagem" : "ola"
    });
});


module.exports = router;