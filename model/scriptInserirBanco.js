
var banco = require("./bancoDados");

// esse script vai ser executado em paralelo
// ele vai nos ajudar a inserir dados no banco de dados


var qtdClientes = 10;

var arrayNomes = ["ana", "alexandre", "bura", "giovani", "egon", "priscila"];

for (var a = 0; a < 10; a++) {
    // inserir usuario;
    // testegit asdfasdd
    // inserirUsuario();
    adicionarTransacoes();

    // recuperar o nome do usuario e os dados
    // inserir cartoes
    // para cada cartao criar as transacoes
    // para cada cartao criar um cache de saldo
}

function adicionarTransacoes() {
    banco.recuperarTodosClientes((clients) => {
        for (let cliente of clients) {
            banco.buscarCartoesUsuario(cliente["idConta"], (cartoes) => {
                for (let c of cartoes) {
                    criarTransacoesPeriodo(c["idCartao"],new Date("2018-10-10"),new Date("2018-10-25"));
                }
            });
        }
    });
}
function criarTransacoesPeriodo(cartaoId, dataInicio, dataFim) {
    var dataPagamento = dataInicio;
    while (dataPagamento.getTime() < dataFim.getTime()) {
        let valor = Number(gerarIntRandomNeg(-1000, 1000));
        criarTransacaoCartao(cartaoId, dataPagamento, dataPagamento, valor, 1, (resultado) => {
            console.log(resultado);
        });
        dataPagamento.setDate(Number(dataPagamento.getDate())+1);
    }

}

function gerarIntRandom(min, max) {
    return Math.floor((Math.random() * Number(max)) + Number(min));
}

function gerarIntRandomNeg(min, max) {
    return Math.floor((Math.random() * Number(max*2)) + Number(min));
}


function inserirUsuario() {
    var numero = gerarIntRandom(0, 100000);

    var nome = String(arrayNomes[gerarIntRandom(0, arrayNomes.length)]) + numero;
    console.log(nome);

    banco.inserirConta(nome, nome, (retorno) => {
        banco.buscarUsuario(nome, (dados) => {
            console.log("usuario: " + JSON.stringify(dados));
            criarCartao(dados["idConta"]);
        });
    });


}
var arrayNomesCartoes = ["VISA", "MasterCard", "ELO"];
var transacoesMes = 1200;
// fazer variacoes
function criarCartao(idConta) {
    var desc = arrayNomesCartoes[gerarIntRandom(0, arrayNomesCartoes.length)];
    var qtdCartoes = Number(gerarIntRandom(2, 5));
    for (var a = 0; a < qtdCartoes; a++) {
        banco.inserirCartao(idConta, desc, (resultado) => {
            console.log(resultado);
        });
    }
    // criar uma data inicial
}

function criarTransacaoCartao(idCartao, dataCriacao, dataPagamento, valor, tipo, callback) {
    banco.inserirTransacao(idCartao, valor, dataCriacao, dataPagamento, "BB", tipo, (resultado) => {
        console.log(resultado);
        callback(resultado);
    });
    // banco
}