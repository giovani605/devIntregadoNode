var mysql = require('mysql');

var con = mysql.createConnection({
  host: "200.134.10.143",
  port: "3306",
  user: "Vampira",
  password: "@Vampira#"
});

 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });