class AlunoViews {
    constructor(elemento) {
        this._elemento = elemento;
    }

    atualiza(alunos) {
        this._elemento.innerHTML = this._template(alunos);
    }

    _template(alunos) {
        if (!alunos.length) {
            return '';
        }

        const aprovados = alunos.filter((aluno) => aluno.aprovado).length;
        const reprovados = alunos.length - aprovados;
        const mediaGeral = alunos.reduce((total, aluno) => total + aluno.mediaFinal, 0) / alunos.length;

        return `
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Primeira nota</th>
                        <th>Segunda nota</th>
                        <th>Frequencia</th>
                        <th>Prova final</th>
                        <th>Media final</th>
                        <th>Situacao</th>
                    </tr>
                </thead>
                <tbody>
                    ${alunos.map((aluno) => `
                        <tr>
                            <td>${this._escapaHtml(aluno.nome)}</td>
                            <td>${this._formataNumero(aluno.primeiraNota)}</td>
                            <td>${this._formataNumero(aluno.segundaNota)}</td>
                            <td>${this._formataNumero(aluno.frequencia)}%</td>
                            <td>${aluno.provaFinal === null ? '-' : this._formataNumero(aluno.provaFinal)}</td>
                            <td>${this._formataNumero(aluno.mediaFinal)}</td>
                            <td class="${aluno.aprovado ? 'text-success' : 'text-danger'}">${aluno.situacao}</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="2">Aprovados: ${aprovados}</th>
                        <th colspan="2">Reprovados: ${reprovados}</th>
                        <th colspan="3">Media geral da turma: ${this._formataNumero(mediaGeral)}</th>
                    </tr>
                </tfoot>
            </table>
        `;
    }

    _formataNumero(numero) {
        const valor = Number(numero);

        return Number.isFinite(valor) ? valor.toFixed(1) : '-';
    }

    _escapaHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }
}
