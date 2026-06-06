var $ = document.querySelector.bind(document);

var campos = [
    $('#nome'),
    $('#primeiraNota'),
    $('#segundaNota'),
    $('#frequencia'),
    $('#provaFinal')
];

var formulario = $('.form');
var alunoView = new AlunoViews($('#js-aluno-view'));
var mensagemView = $('#js-mensagem-view');

var alunoController = new AlunoController(
    campos,
    formulario,
    alunoView,
    mensagemView
);
