const app = require("./app");
const http = require("http");
var bancoDados = require("./model/bancoDados");
// comentario
const server = http.createServer(app);

server.listen(3001,function(){
    console.log("Servidor rodando");
});
