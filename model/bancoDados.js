"use strict"
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "200.134.10.221",
  port: "3306",
  user: "vampira",
  password: "@vampira#"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Conectado ao banco de dados!");
});

// reduzir a funcao de cima
function queryTeste(callback) {
  console.log("chameii");
  con.query("SELECT * FROM vampira.Cartao", function (err, result, fields) {
    if (err) throw (err);
    console.log("volto o banco");
    callback(result);
  });
}
function inserirAspas(a) {
  return "'" + a + "'";
}

// PROTOTIPO DE FUNCOES PARA ACESSAR O BANCO
// a funcao vai ter como entrada um valor e
// uma funcao de callback que sera chamada depois que os dados retornarem do banco
function queryPrototipo(valor, callback) {
  // Defina a query a ser executada
  var query = "SELECT * FROM vampira.Conta where usuario = " + inserirAspas(valor);
  con.query(query, function (err, result, fields) {
    // Essa parte aqui é executada quando a query volta do banco
    if (err) throw (err);

    // As vezes é interresante processar/ajeitar como os dados vem do banco
    var usuario = JSON.parse(JSON.stringify(result[0]));

    // No final vc chama  a funcao de callback com o resultado da query
    callback(usuario);
  });
}

// Comentario


function buscarUsuario(user, callback) {
  var query = "SELECT * FROM vampira.Conta where usuario = " + inserirAspas(user);
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    var usuario = JSON.parse(JSON.stringify(result[0]));
    console.log(usuario);
    callback(usuario);
  });
}

function buscarCartoesUsuario(userId, callback) {
  var query = "SELECT * FROM vampira.Cartao where Conta_pertence = " + inserirAspas(userId);
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    var cartoes = JSON.parse(JSON.stringify(result));
    console.log(cartoes);
    callback(cartoes);
  });
}


function formatarData(data){
    var a = "('";
    a += data.getFullYear();
    a+="-";
    a+=Number(data.getMonth()+1);
    a+="-";
    a+=data.getDate();
    a+="')";
    console.log("resultado data : " + a);
    return a;
}


// funcoes de transacoes
function buscarTransacoesPeriodo(idCartao, inicio, fim, callback) {
  var query = "SELECT * FROM vampira.Transacao where Cartao_origem = " + inserirAspas(idCartao) + " and data_pagamento between " + formatarData(inicio) + " and " + formatarData(fim) ;
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    var transacoes = JSON.parse(JSON.stringify(result));
    console.log(transacoes);
    callback(transacoes);
  });
}

function buscarUltimoCacheSaldo(idCartao, callback) {
  var query = "select *,max(periodo_final) from  vampira.cacheSaldo where Cartao_idCartao = " + idCartao;
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    var transacoes = JSON.parse(JSON.stringify(result));
    console.log("recuperar Cache " );
    console.log(transacoes[0]);
    callback(transacoes[0]);
  });
}


exports.queryTeste = queryTeste;
exports.buscarUsuario = buscarUsuario;
exports.buscarCartoesUsuario = buscarCartoesUsuario;
exports.buscarTransacoesPeriodo = buscarTransacoesPeriodo;
exports.buscarUltimoCacheSaldo = buscarUltimoCacheSaldo;