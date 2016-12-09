var ws;

var tensao = 0;
var corrente = 0;
var velocidade = 0;

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
    return (x - in_min) * (1 - 0) / (in_max - in_min) + 0;
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
        tensao = parseFloat(dados['01'])
            // medidorTensao.refresh(tensao);
        medidorTensao.value(converte(tensao, 0, 50));
        $('#medidorTensaoTexto').html(tensao);
    }
    if (dados['02'] != null) {
        corrente = parseFloat(dados['02']);
        // medidorCorrente.refresh(corrente);
        medidorCorrente.value(converte(corrente, 0, 30));
        $('#medidorCorrenteTexto').html(corrente);
    }
    if (dados['03'] != null) {
        velocidade = parseInt(dados['03']);
        //velocimetro.refresh(velocidade);
        velocimetro.value(converte(velocidade, 0, 50));
        $('#velocimetroTexto').html(velocidade);
        // velocimetro.value = velocidade;
    }
    if (dados['04'] != null) {
        var distancia = parseFloat(dados['04']);
        hodometro.refresh(distancia);
    }

    if (dados['05'] != null) {
        var temp = parseFloat(dados['05']);
        // temperaturaBaterias.refresh(temp);
        temperaturaBaterias.value(converte(temp, 0, 100));
        $('#temperaturaBateriasTexto').html(temp);
    }

    if (dados['06'] != null) {
        var temp = parseFloat(dados['06']);
        // temperaturaCockpit.refresh(temp);
        temperaturaCockpit.value(converte(temp, 0, 100));
        $('#temperaturaCockpitTexto').html(temp);
    }

    if (dados['20'] != null) {
        log(dados['20'], true);
    }

    //Calcula potencia instantânea
    if (!isNaN(tensao) && tensao > 0.1 && !isNaN(corrente) && corrente > 0.01) {
        // wattimetro.refresh(tensao * corrente);
        wattimetro.value(converte(tensao * corrente, 0, 1500));
        $('#wattimetroTexto').html(tensao * corrente);
        //calcula consumo instantâneo
        if (!isNaN(velocidade) && velocidade > 0) {
            // consumoInstantaneo.refresh(tensao * corrente / velocidade);
            consumoInstantaneo.value(converte((tensao * corrente / velocidade),
                0, 1500));
            $('#consumoInstantaneoTexto').html(tensao * corrente / velocidade);
            // autonomiaInstantanea.refresh(velocidade / (tensao * corrente));
            autonomiaInstantanea.value(converte(velocidade / (tensao * corrente),
                0, 1500));
            $('#autonomiaInstantaneaTexto').html(velocidade / (tensao * corrente));
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
