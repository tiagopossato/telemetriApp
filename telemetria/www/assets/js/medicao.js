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
        gauges.medidorTensao.value(converte(medicao.tensao, 0.0, 50.0));
        $('#medidorTensaoTexto').html(medicao.tensao.toFixed(2));
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
        gauges.medidorCorrente.value(converte(medicao.corrente, 0.0, 50.0));
        $('#medidorCorrenteTexto').html(medicao.corrente.toFixed(2));
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
        gauges.velocimetro.value(converte(medicao.velocidade, 0, 50));
        $('#velocimetroTexto').html(medicao.velocidade.toFixed(2));
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
        gauges.wattimetro.value(converte(medicao.potencia, 0, 1500));
        $('#wattimetroTexto').html(medicao.potencia.toFixed(2));

        //calcula consumo instantâneo
        if (!isNaN(medicao.velocidade) && medicao.velocidade > 0) {
            // consumoInstantaneo.refresh(tensao * medicao.corrente / velocidade);
            gauges.consumoInstantaneo.value(converte((medicao.potencia / medicao.velocidade),
                0, 100));
            $('#consumoInstantaneoTexto').html(parseFloat(medicao.potencia / medicao.velocidade).toFixed(2));
            // autonomiaInstantanea.refresh(velocidade / (tensao * medicao.corrente));
            gauges.autonomiaInstantanea.value(parseFloat(converte(medicao.velocidade / medicao.potencia).toFixed(2),
                0, 10));
            $('#autonomiaInstantaneaTexto').html(parseFloat(medicao.velocidade / medicao.potencia).toFixed(2));
        }
    },
    setTemperaturaBaterias(t) {
        medicao.temperaturaBaterias = t;
        gauges.temperaturaBaterias.value(converte(medicao.temperaturaBaterias, 0, 100));
        $('#temperaturaBateriasTexto').html(medicao.temperaturaBaterias.toFixed(2));
    },
    setTemperaturaCockpit: function(t) {
        medicao.temperaturaCockpit = t;
        gauges.temperaturaCockpit.value(converte(medicao.temperaturaCockpit, 0, 100));
        $('#temperaturaCockpitTexto').html(medicao.temperaturaCockpit.toFixed(2));
    },
    zerarEstatisticas: function() {
        medicao.setTensao(0);
        medicao.tensaoMaxima = 0.0;
        medicao.tensaoMinima = 500.0;
        $("#tensaoMinima").val(0);
        $("#tensaoMaxima").val(0);

        medicao.setCorrente(0);
        medicao.correnteMaxima = 0.0;
        medicao.correnteMinima = 500.0;
        $("#correnteMinima").val(0);
        $("#correnteMaxima").val(0);

        medicao.setVelocidade(0.0001);
        medicao.velocidadeMaxima = 0.0;
        medicao.velocidadeMinima = 500.0;
        medicao.velocidadeMedia = 0.0;
        medicao.velocidadeQtd = 0.0;
        $("#velocidadeMinima").val(0);
        $("#velocidadeMaxima").val(0);
        $("#velocidadeMedia").val(0);

        medicao.setPotencia(0);
        medicao.potenciaMaxima = 0.0;
        medicao.potenciaMinima = 500.0;
        medicao.potenciaMedia = 0.0;
        medicao.potenciaQtd = 0.0;
        $("#potenciaMinima").val(0);
        $("#potenciaMaxima").val(0);
        $("#potenciaMedia").val(0);

        medicao.setTemperaturaCockpit(0);
        medicao.setTemperaturaBaterias(0);
    }
};
