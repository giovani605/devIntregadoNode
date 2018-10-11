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



exports.queryTeste = queryTeste;
exports.buscarUsuario = buscarUsuario;
exports.buscarCartoesUsuario = buscarCartoesUsuario;