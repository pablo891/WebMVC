class Aluno {
    constructor(nome, primeiraNota, segundaNota, frequencia, provaFinal) {
        this.nome = this._validaNome(nome);
        this.primeiraNota = this._validaNumero(primeiraNota, 'Primeira nota', 0, 10);
        this.segundaNota = this._validaNumero(segundaNota, 'Segunda nota', 0, 10);
        this.frequencia = this._validaNumero(frequencia, 'Frequencia', 0, 100);

        this.mediaParcial = (this.primeiraNota + this.segundaNota) / 2;
        this.precisaProvaFinal = this.frequencia >= 75 && this.mediaParcial >= 4 && this.mediaParcial < 7;
        this.provaFinal = this.precisaProvaFinal
            ? this._validaNumero(provaFinal, 'Prova final', 0, 10)
            : null;

        this.mediaFinal = this._calculaMediaFinal();
        this.aprovado = this._calculaAprovacao();
        this.situacao = this.aprovado ? 'Aprovado' : 'Reprovado';
    }

    _calculaMediaFinal() {
        if (!this.precisaProvaFinal) {
            return this.mediaParcial;
        }

        return (this.mediaParcial + this.provaFinal) / 2;
    }

    _calculaAprovacao() {
        if (this.frequencia < 75) {
            return false;
        }

        if (this.mediaParcial >= 7) {
            return true;
        }

        return this.precisaProvaFinal && this.mediaFinal >= 5;
    }

    _validaNome(nome) {
        const nomeTratado = nome.trim();

        if (!nomeTratado) {
            throw new Error('Informe o nome do aluno.');
        }

        return nomeTratado;
    }

    _validaNumero(valor, campo, minimo, maximo) {
        const numero = Number(valor);

        if (valor === '' || !Number.isFinite(numero)) {
            throw new Error(`Informe um valor valido para ${campo}.`);
        }

        if (numero < minimo || numero > maximo) {
            throw new Error(`${campo} deve estar entre ${minimo} e ${maximo}.`);
        }

        return numero;
    }
}
