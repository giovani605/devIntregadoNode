const app = require("./app");
const http = require("http");
var bancoDados = require("./model/bancoDados");

const server = http.createServer(app);

server.listen(3000,function(){
    console.log("Servidor rodando");
});