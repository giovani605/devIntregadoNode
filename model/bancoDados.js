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
  console.log("Connected!");
});

async function queryTeste(callback) {
  console.log("chameii");
  return new Promise((fulfill, reject) => {
    con.query("SELECT * FROM vampira.Cartao", function (err, result, fields) {
      if (err) throw reject(err);
      console.log("volto o banco");
      fulfill((result));
      callback(result);
    })
  });
}

// reduzir a funcao de cima
function queryTesteLivre(callback) {
  console.log("chameii");
  con.query("SELECT * FROM vampira.Cartao", function (err, result, fields) {
    if (err) throw (err);
    console.log("volto o banco");
    callback(result);
  });
}



exports.queryTeste = queryTeste;
exports.queryTesteLivre = queryTesteLivre;