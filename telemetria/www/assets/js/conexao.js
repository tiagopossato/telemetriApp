var ws;

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
        medicao.setTensao(parseFloat(dados['01']));
        medidorTensao.value(converte(medicao.tensao, 0.0, 50.0));
        $('#medidorTensaoTexto').html(medicao.tensao.toFixed(2));
    }
    if (dados['02'] != null) {
        medicao.setCorrente(parseFloat(dados['02']));
        medidorCorrente.value(converte(medicao.corrente, 0.0, 50.0));
        $('#medidorCorrenteTexto').html(medicao.corrente.toFixed(2));
    }
    if (dados['03'] != null) {
        medicao.setVelocidade(parseFloat(dados['03']));
        velocimetro.value(converte(medicao.velocidade, 0, 50));
        $('#velocimetroTexto').html(medicao.velocidade.toFixed(2));
    }
    if (dados['04'] != null) {
        var distancia = parseFloat(dados['04']);
        hodometro.refresh(distancia);
    }

    if (dados['05'] != null) {
        var temp = parseFloat(dados['05']);
        temperaturaBaterias.value(converte(temp, 0, 100));
        $('#temperaturaBateriasTexto').html(temp.toFixed(2));
    }

    if (dados['06'] != null) {
        var temp = parseFloat(dados['06']);
        temperaturaCockpit.value(converte(temp, 0, 100));
        $('#temperaturaCockpitTexto').html(temp.toFixed(2));
    }

    if (dados['20'] != null) {
        log(dados['20'], true);
    }

    //Calcula potencia instantânea
    if (!isNaN(medicao.tensao) && medicao.tensao > 0.1 && !isNaN(medicao.corrente) && medicao.corrente > 0.01) {
        medicao.setPotencia(parseFloat(medicao.tensao * medicao.corrente));
        wattimetro.value(converte(medicao.potencia, 0, 1500));
        $('#wattimetroTexto').html(medicao.potencia.toFixed(2));
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
