
var banco = require("./bancoDados");

// esse script vai ser executado em paralelo
// ele vai nos ajudar a inserir dados no banco de dados


var qtdClientes = 10;

var arrayNomes = ["ana", "alexandre", "bura", "giovani", "egon", "priscila"];

for (var a = 0; a < 10; a++) {
    // inserir usuario;
    inserirUsuario();
    // recuperar o nome do usuario e os dados
    // inserir cartoes
    // para cada cartao criar as transacoes
    // para cada cartao criar um cache de saldo
}
function gerarIntRandom(min, max) {
    return Math.floor((Math.random() * Number(max)) + Number(min));
}

function inserirUsuario() {
    var numero = gerarIntRandom(0, 10000);

    var nome = String(arrayNomes[gerarIntRandom(0, arrayNomes.length)]) + numero;
    console.log(nome);

    //banco.inserirUser


}
var arrayNomesCartoes = ["VISA","MasterCard","ELO"];
var transacoesMes = 1200;
// fazer variacoes
function criarCarto(idConta){
    var desc = arrayNomesCartoes[gerarIntRandom(0, arrayNomesCartoes.length)];
    // banco.inserirNovoCartao ... {}
    // criar uma data inicial
}

function criarTransacaoCartao(idCartao,dataCriacao,dataPagamento,valor,tipo){

    // banco
}