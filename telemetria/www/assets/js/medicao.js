var medicao = {
    tensao: 0.0,
    tensaoMaxima: 0.0,
    tensaoMinima: 500.0,
    corrente: 0.0,
    correnteMaxima: 0.0,
    correnteMinima: 500.0,
    velocidade: 0.0,
    velocidadeMaxima: 0.0,
    velocidadeMinima: 500.0,
    velocidadeMedia: 0,
    velocidadeQtd: 0,
    potencia: 0.0,
    potenciaMaxima: 0.0,
    potenciaMinima: 500.0,
    potenciaMedia: 0.0,
    potenciaQtd: 0,

    setTensao: function(t) {
        medicao.tensao = t;
        if (medicao.tensao > medicao.tensaoMaxima) {
            medicao.tensaoMaxima = medicao.tensao;
            $("#tensaoMaxima").val(medicao.tensaoMaxima.toFixed(2));
        }
        if (medicao.tensao < medicao.tensaoMinima) {
            medicao.tensaoMinima = medicao.tensao;
            $("#tensaoMinima").val(medicao.tensaoMinima.toFixed(2));
        }
    },
    setCorrente: function(c) {
        medicao.corrente = c;
        if (medicao.corrente > medicao.correnteMaxima) {
            medicao.correnteMaxima = medicao.corrente;
            $("#correnteMaxima").val(medicao.correnteMaxima.toFixed(2));
        }
        if (medicao.corrente < medicao.correnteMinima) {
            medicao.correnteMinima = medicao.corrente;
            $("#correnteMinima").val(medicao.correnteMinima.toFixed(2));
        }
    },

    setVelocidade: function(v) {
        medicao.velocidade = v;
        if (medicao.velocidade > medicao.velocidadeMaxima) {
            medicao.velocidadeMaxima = medicao.velocidade;
            $("#velocidadeMaxima").val(medicao.velocidadeMaxima.toFixed(2));
        }
        if (medicao.velocidade < medicao.velocidadeMinima) {
            medicao.velocidadeMinima = medicao.velocidade;
            $("#velocidadeMinima").val(medicao.velocidadeMinima.toFixed(2));
        }
        medicao.velocidadeMedia = ((medicao.velocidadeMedia * medicao.velocidadeQtd) + medicao.velocidade) / (medicao.velocidadeQtd + 1);
        medicao.velocidadeQtd++;
        $("#velocidadeMedia").val(medicao.velocidadeMedia.toFixed(2));
    },

    setPotencia: function(p) {
        medicao.potencia = p;
        if (medicao.potencia > medicao.potenciaMaxima) {
            medicao.potenciaMaxima = medicao.potencia;
            $("#potenciaMaxima").val(medicao.potenciaMaxima.toFixed(2));
        }
        if (medicao.potencia < medicao.potenciaMinima) {
            medicao.potenciaMinima = medicao.potencia;
            $("#potenciaMinima").val(medicao.potenciaMinima.toFixed(2));
        }
        medicao.potenciaMedia = ((medicao.potenciaMedia * medicao.potenciaQtd) + medicao.potencia) / (medicao.potenciaQtd + 1);
        medicao.potenciaQtd++;
        $("#potenciaMedia").val(medicao.potenciaMedia.toFixed(2));
    },
    zerarEstatisticas: function() {
        medicao.tensaoMaxima = 0.0;
        medicao.tensaoMinima = 500.0;
        $("#tensaoMinima").val(0);
        medicao.correnteMaxima = 0.0;
        medicao.correnteMinima = 500.0;
        $("#correnteMinima").val(0);
        medicao.velocidadeMaxima = 0.0;
        medicao.velocidadeMinima = 500.0;
        medicao.velocidadeMedia = 0.0;
        $("#velocidadeMinima").val(0);
        medicao.potenciaMaxima = 0.0;
        medicao.potenciaMinima = 500.0;
        medicao.potenciaMedia = 0.0;
        $("#potenciaMinima").val(0);
    }
};
