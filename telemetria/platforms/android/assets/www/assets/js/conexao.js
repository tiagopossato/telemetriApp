var ws;

var medicao = {
    tensao: 0.0,
    tensaoMaxima: 0.0,
    tensaoMinima: 500.0,
    corrente: 0.0,
    correnteMaxima: 500.0,
    correnteMinima: 0.0,
    velocidade: 0.0,
    velocidadeMaxima: 0.0,
    velocidadeMinima: 500.0,
    potencia: 0.0,
    potenciaMaxima: 0.0,
    potenciaMinima: 500.0
};

function conecta() {

    try {
        ws = new WebSocket('ws://' + $("#ipTelemetria").val() + ':81');
    } catch (err) {
        console.log(err);
        return;
    }
    $("#botaoCancelarConexao").show('slow');

    $(".progress").show('slow');

    $("#botaoConectar").hide('slow');

    log('Conectando...', true);

    ws.onopen = function(e) {
        log('Conectado', true);
        $("#botaoCancelarConexao").show('slow');
        $(".progress").hide('slow');
        lerDados();
        lerDados();
    };

    ws.onclose = function(e) {
        log('Desconectado', true);
        $("#botaoConectar").show('slow');
        $(".progress").hide('slow');
        $("#botaoCancelarConexao").hide('slow');
    };

    ws.onerror = function(e) {
        log('Erro na conexão!', true);
        $("#botaoConectar").show('slow');
        $(".progress").hide('slow');
        $("#botaoCancelarConexao").hide('slow');
    };
    ws.onmessage = function(e) {
        trataDadosRecebidos(e);
    };
}

function send(msg) {
    waitForSocketConnection(function() {
        msg += ';';
        ws.send(msg);
        log('Mensagem enviada:' + msg);
    });
}


function converte(x, in_min, in_max) {
    return (x - in_min) * (1.0 - 0.0) / (in_max - in_min) + 0.0;
}

function trataDadosRecebidos(e) {
    //log('Recebido: ' + e.data);
    try {
        var dados = JSON.parse(e.data);
    } catch (err) {
        log(e.data);
        console.error(err.message);
    }

    if (dados['01'] != null) {
        medicao.tensao = parseFloat(dados['01']).toFixed(2);

        if (medicao.tensao > medicao.tensaoMaxima) {
            medicao.tensaoMaxima = medicao.tensao;
        }
        if (medicao.tensao < medicao.tensaoMinima) {
            medicao.tensaoMinima = medicao.tensao;
        }

        medidorTensao.value(converte(medicao.tensao, 0.0, 50.0));
        $('#medidorTensaoTexto').html(parseFloat(medicao.tensao));
    }
    if (dados['02'] != null) {
        medicao.corrente = parseFloat(dados['02']).toFixed(2);

        if (medicao.corrente > medicao.correnteMaxima) {
            medicao.correnteMaxima = medicao.corrente;
        }
        if (medicao.corrente < medicao.correnteMinima) {
            medicao.correnteMinima = medicao.corrente;
        }
        medidorCorrente.value(converte(medicao.corrente, 0.0, 50.0));
        $('#medidorCorrenteTexto').html(parseFloat(medicao.corrente));
    }
    if (dados['03'] != null) {
        medicao.velocidade = parseFloat(dados['03']).toFixed(2);
        if (medicao.velocidade > medicao.velocidadeMaxima) {
            medicao.velocidadeMaxima = medicao.velocidade;
        }
        if (medicao.velocidade < medicao.velocidadeMinima) {
            medicao.velocidadeMinima = medicao.velocidade;
        }

        velocimetro.value(converte(medicao.velocidade, 0, 50));
        $('#velocimetroTexto').html(medicao.velocidade);
    }
    if (dados['04'] != null) {
        var distancia = parseFloat(dados['04']);
        hodometro.refresh(distancia);
    }

    if (dados['05'] != null) {
        var temp = parseFloat(dados['05']).toFixed(2);
        // temperaturaBaterias.refresh(temp);
        temperaturaBaterias.value(converte(temp, 0, 100));
        $('#temperaturaBateriasTexto').html(temp);
    }

    if (dados['06'] != null) {
        var temp = parseFloat(dados['06']).toFixed(2);
        // temperaturaCockpit.refresh(temp);
        temperaturaCockpit.value(converte(temp, 0, 100));
        $('#temperaturaCockpitTexto').html(temp);
    }

    if (dados['20'] != null) {
        log(dados['20'], true);
    }

    //Calcula potencia instantânea
    if (!isNaN(medicao.tensao) && medicao.tensao > 0.1 && !isNaN(medicao.corrente) && medicao.corrente > 0.01) {
      medicao.potencia = parseFloat(medicao.tensao * medicao.corrente).toFixed(2);

      if (medicao.potencia > medicao.potenciaMaxima) {
          medicao.potenciaMaxima = medicao.potencia;
      }
      if (medicao.potencia < medicao.potenciaMinima) {
          medicao.potenciaMinima = medicao.potencia;
      }

        wattimetro.value(converte(medicao.potencia, 0, 1500));
        $('#wattimetroTexto').html(medicao.potencia);
        //calcula consumo instantâneo
        if (!isNaN(medicao.velocidade) && medicao.velocidade > 0) {
            // consumoInstantaneo.refresh(tensao * medicao.corrente / velocidade);
            consumoInstantaneo.value(converte((medicao.potencia / medicao.velocidade),
                0, 1500));
            $('#consumoInstantaneoTexto').html(parseFloat(medicao.potencia / medicao.velocidade).toFixed(2));
            // autonomiaInstantanea.refresh(velocidade / (tensao * medicao.corrente));
            autonomiaInstantanea.value(parseFloat(converte(medicao.velocidade / medicao.potencia).toFixed(2),
                0, 1500));
            $('#autonomiaInstantaneaTexto').html(parseFloat(medicao.velocidade / medicao.potencia).toFixed(2));
        }
    }
}

function lerDados() {
    send('1:175');
}

function pararLerDados() {
    send('1:');
}

function waitForSocketConnection(callback) {
    setTimeout(
        function() {
            if (ws.readyState == 1) {
                if (callback != undefined) {
                    callback();
                }
                return;
            } else {
                waitForSocketConnection(callback);
            }
        }, 5);
}
