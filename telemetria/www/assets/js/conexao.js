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
    }
    if (dados['02'] != null) {
        medicao.setCorrente(parseFloat(dados['02']));
    }
    if (dados['03'] != null) {
        medicao.setVelocidade(parseFloat(dados['03']));
    }
    if (dados['04'] != null) {
        var distancia = parseFloat(dados['04']);
        hodometro.refresh(distancia);
    }

    if (dados['05'] != null) {
        medicao.setTemperaturaBaterias(parseFloat(dados['05']));
    }

    if (dados['06'] != null) {
        medicao.setTemperaturaCockpit(parseFloat(dados['06']));
    }

    if (dados['20'] != null) {
        log(dados['20'], true);
    }

    //Calcula potencia instantânea
    if (!isNaN(medicao.tensao) && medicao.tensao > 0.1 && !isNaN(medicao.corrente) && medicao.corrente > 0.01) {
        medicao.setPotencia(parseFloat(medicao.tensao * medicao.corrente));
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
