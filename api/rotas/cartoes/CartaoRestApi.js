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

// Fazer essa funcao
function calcularSaldoPeriodo(cartao,inicio,fim){
    // testar validade das varaiveis

    // como fazer?
    // consultar transações por periodo

    // calcular um periodo é facil porem
    // preciso garantir que o valor que tenho antes esta certo
    // salvar o saldo do cartao a cada x periodo
        // pode ser a cada mes
    // recuperar o cache mais recente
        // Testar se o cache é valido - caso invalido recalcular dinamicamente recursivo
    // secrementamente sempre colocar o inciio do periodo para o dia em o cache do saldo é criado, quando possivel.
}


// quando criar uma nova transacao
// talvez nao seja necessario implementar
function realizarTransfencia(){

}


// Calcula o cache de um periodo e salva
// essa funcao eh a base para criar o cache do saldo
function calcularCacheSaldo(){

}
// Vai calcular o saldo desde o inicio da conta
function calcularCacheSaldoAll(){

}


module.exports = router;