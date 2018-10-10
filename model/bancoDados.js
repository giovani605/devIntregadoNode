var mysql = require('mysql');

var con = mysql.createConnection({
  host: "200.134.10.221",
  port: "3306",
  user: "vampira",
  password: "@vampira#"
});

 con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });