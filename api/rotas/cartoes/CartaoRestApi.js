"use strict"

const express = require('express');
const router = express.Router();
var banco = require("../../../model/bancoDados");

// nesse arquivo fica a rota que lida com os cartoes
router.get("/:id", (req, res, next) => {
    recuperarSaldoAtual(req.params.id, (dados) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": dados
        })

    });
});
router.get("/user/:id", (req, res, next) => {
    banco.buscarCartoesUsuario(req.params.id, (dados) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": dados
        })

    });
});

router.post("/transacao", (req, res, next) => {
    var idCartao = req.body.idCartao;
    console.log("id" + JSON.stringify(req.body));
    calcularSaldoPeriodo(idCartao, new Date(), new Date(), (dados) => {
        res.status(200).send({
            "mensagem": "ok",
            "dados": dados
        });
    });
});

// Fazer essa funcao
// Tem varios placeholders
function calcularSaldoPeriodo(idCartao, inicio, fim, callback) {
    // testar validade das varaiveis

    // como fazer?
    // consultar transações por periodo
    banco.buscarTransacoesPeriodo(idCartao, inicio, fim, (transacoes) => {
        var total = somarSaldo(transacoes)
        // coisas a fazer
        console.log("Calculo total: " + total);
        callback(total);
    });

    // calcular um periodo é facil porem
    // preciso garantir que o valor que tenho antes esta certo
    // salvar o saldo do cartao a cada x periodo
    // pode ser a cada mes
    // recuperar o cache mais recente
    // Testar se o cache é valido - caso invalido recalcular dinamicamente recursivo
    // secrementamente sempre colocar o inciio do periodo para o dia em o cache do saldo é criado, quando possivel.
}

// TODO
// Recuperar ultimo cache de Saldo
function recuperarCacheSaldoRecente(idCartao, callback) {

    banco.buscarUltimoCacheSaldo(idCartao, (resultado) => {
        callback(resultado);
    });

}
// TODO
// Recupera Saldo Atual do cartao
// Caso necessario tbm calcula oq for necessario para atualizar o saldo
function recuperarSaldoAtual(idCartao, callback) {
    recuperarCacheSaldoRecente(idCartao, (resultado) => {
        var saldoSalvo;
        if (!resultado) {
            var saldoSalvo = 0;
        } else {
            var saldoSalvo = resultado["saldo"];
        }
        // com base nisso .... 

        var inicio = new Date(resultado["periodo_final"]);
        console.log("Data de inicio " + inicio);
        // soma um dia para frente
        inicio.setDate(inicio.getDate() + 1);
        banco.buscarTransacoesPeriodo(idCartao, inicio, new Date(), (transacoes) => {
            var total = somarSaldo(transacoes);
            console.log(saldoSalvo);
            var saldoAtual = Number(saldoSalvo) + Number(total);
            console.log(saldoAtual);
            // posso ate atualizar isso no database
            var final = {
                "saldo": saldoAtual,
                "trasacoes": transacoes,
                "cache": resultado
            }
            callback(final);
        });
    });
}
// TODO
function criarCacheSaldo(idCartao, inicio, fim, callback) {

    // consultar transações por periodo
    banco.buscarTransacoesPeriodo(idCartao, inicio, fim, (transacoes) => {
        var total = somarSaldo(transacoes)
        // coisas a fazer
        console.log("Calculo total: " + total);
        // salvar no banco esse cache

        callback(total);
    });

}

// recebe uma lista de transacoes e retorna o valor delas
function somarSaldo(ListaTransacoes) {
    var total = 0;
    for (let t of ListaTransacoes) {
        total += Number(t["valor"]);
    }
    return total;
}


// quando criar uma nova transacao
// talvez nao seja necessario implementar
function realizarTransfencia() {

}


// Calcula o cache de um periodo e salva
// essa funcao eh a base para criar o cache do saldo
function calcularCacheSaldo() {

}
// Vai calcular o saldo desde o inicio da conta
function calcularCacheSaldoAll() {

}


module.exports = router;