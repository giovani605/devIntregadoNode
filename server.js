const app = require("./app");
const http = require("http");
var bancoDados = require("./model/bancoDados");

const server = http.createServer(app);

server.listen(3001,function(){
    console.log("Servidor rodando");
});