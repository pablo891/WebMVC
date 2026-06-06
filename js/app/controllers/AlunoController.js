class AlunoController {
    constructor(campos, formulario, alunoView, mensagemView) {
        this._alunos = [];
        this._campos = campos;
        this._formulario = formulario;
        this._view = alunoView;
        this._mensagemView = mensagemView;

        [
            this._campos[1],
            this._campos[2],
            this._campos[3]
        ].forEach((input) => input.addEventListener('input', () => this.atualizaProvaFinal()));

        this._formulario.addEventListener('reset', () => setTimeout(() => this.atualizaProvaFinal()));

        this.atualizaProvaFinal();
        this._view.atualiza(this._alunos);
    }

    adiciona(evento) {
        evento.preventDefault();

        try {
            const aluno = new Aluno(
                this._campos[0].value,
                this._campos[1].value,
                this._campos[2].value,
                this._campos[3].value,
                this._campos[4].value
            );

            this._alunos = [...this._alunos, aluno];
            this._view.atualiza(this._alunos);
            this._limpaFormulario(evento.target);
            this._notifica(`${aluno.nome} cadastrado com situacao: ${aluno.situacao}.`, 'success');
        } catch (erro) {
            this._notifica(erro.message, 'danger');
        }
    }

    atualizaProvaFinal() {
        const primeiraNota = this._valorNumerico(this._campos[1]);
        const segundaNota = this._valorNumerico(this._campos[2]);
        const frequencia = this._valorNumerico(this._campos[3]);
        const dadosParciaisValidos = [primeiraNota, segundaNota, frequencia].every(Number.isFinite);
        const mediaParcial = dadosParciaisValidos ? (primeiraNota + segundaNota) / 2 : 0;
        const precisaProvaFinal = frequencia >= 75 && mediaParcial >= 4 && mediaParcial < 7;

        this._campos[4].disabled = !precisaProvaFinal;
        this._campos[4].required = precisaProvaFinal;

        if (!precisaProvaFinal) {
            this._campos[4].value = '';
        }
    }

    _valorNumerico(input) {
        return input.value === '' ? null : Number(input.value);
    }

    _limpaFormulario(formulario) {
        formulario.reset();
        this.atualizaProvaFinal();
        this._campos[0].focus();
    }

    _notifica(mensagem, tipo) {
        this._mensagemView.innerHTML = `
            <div class="alert alert-${tipo}" role="alert">
                ${mensagem}
            </div>
        `;
    }
}
