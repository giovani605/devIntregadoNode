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

// Bura exemplo aqui
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

function recuperarTodosClientes(callback) {
  var query = "SELECT * FROM vampira.Conta ";
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    var usuario = JSON.parse(JSON.stringify(result));
    console.log(usuario);
    callback(usuario);
  });
}




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




// funcoes de cartaoes
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
function atualizarSaldoCartao(idCartao, saldoAtual) {
  var query = "UPDATE vampira.Cartao SET saldo = " + saldoAtual + "  where idCartao =" + inserirAspas(idCartao);
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    console.log(result);
  });
}


function formatarData(data) {
  var a = "('";
  a += data.getFullYear();
  a += "-";
  a += Number(data.getMonth() + 1);
  a += "-";
  a += data.getDate();
  a += "')";
  return a;
}


// funcoes de transacoes
function buscarTransacoesPeriodo(idCartao, inicio, fim, callback) {
  var query = "SELECT * FROM vampira.Transacao where Cartao_origem = " + inserirAspas(idCartao) + " and data_pagamento between " + formatarData(inicio) + " and " + formatarData(fim);
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
    console.log("recuperar Cache ");
    console.log(transacoes[0]);
    callback(transacoes[0]);
  });
}

function inserirConta(usuario, senha, callback) {
  var query = "  INSERT INTO `vampira`.`Conta`(`nome`,`usuario`, `senha`)"
    + "VALUES(" + inserirAspas(usuario) + "," + inserirAspas(usuario) + "," + inserirAspas(senha) + ")";
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    console.log("Inserido conta");
    callback("sucesso");
  });
}

function inserirCartao(contaId, desc, callback) {
  var query = "INSERT INTO `vampira`.`Cartao` (`saldo`,`Conta_pertence`,`Descricao`)"
    + "VALUES(0," + contaId + "," + inserirAspas(desc) + ");"
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    console.log("Inserido conta");
    callback("sucesso");
  });
}

function inserirTransacao(cartaoId, valor, dataCriacao, dataPagamento,
  destino, tipo, callback) {
  var query = "INSERT INTO `vampira`.`Transacao`(`Cartao_origem`,`valor`,`destino`,`data_criacao`,`data_pagamento`,`Tipo`)" +
    "VALUES(" + cartaoId + "," + valor + "," + inserirAspas(destino) +
    "," + formatarData(dataCriacao) + "," + formatarData(dataPagamento) + "," + tipo + ");"
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    console.log("Inserido Transacao " + query);
    callback("sucesso");
  });
}









// funcoes cache
function inserirCacheSaldo(idCartao, saldoAtual, inicio, dataFim, callback) {

  var query = "INSERT INTO vampira.cacheSaldo" +
    "(Cartao_idCartao,periodo_inicio,periodo_final,saldo)" +
    "VALUES(" + idCartao + "," + formatarData(inicio) + "," + formatarData(dataFim) + "," + saldoAtual + ")";
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) throw (err);
    console.log("sucesso em salvar o cache");
    callback("sucesso");
  });
}


exports.queryTeste = queryTeste;
exports.buscarUsuario = buscarUsuario;
exports.buscarCartoesUsuario = buscarCartoesUsuario;
exports.buscarTransacoesPeriodo = buscarTransacoesPeriodo;
exports.buscarUltimoCacheSaldo = buscarUltimoCacheSaldo;
exports.atualizarSaldoCartao = atualizarSaldoCartao;
exports.inserirCacheSaldo = inserirCacheSaldo;
exports.inserirConta = inserirConta;
exports.inserirCartao = inserirCartao;
exports.inserirTransacao = inserirTransacao;
exports.recuperarTodosClientes = recuperarTodosClientes;