var gauges = {
    velocimetro: new Gauge(document.getElementById("velocimetro")),

    wattimetro: new Gauge(document.getElementById("wattimetro")),

    medidorTensao: new Gauge(document.getElementById("medidorTensao")),

    medidorCorrente: new Gauge(document.getElementById("medidorCorrente")),

    consumoInstantaneo: new Gauge(document.getElementById("consumoInstantaneo")),

    autonomiaInstantanea: new Gauge(document.getElementById(
        "autonomiaInstantanea")),

    temperaturaBaterias: new Gauge(document.getElementById(
        "temperaturaBaterias")),

    temperaturaCockpit: new Gauge(document.getElementById("temperaturaCockpit"))
};

var hodometro = new Odometer({
    el: document.getElementById('hodometro'),
    format: '( ddd),dd',
    theme: 'car'
});

//reescreve função para manter o mesmo nome dos gauges
var oldHod = hodometro.update;
hodometro.refresh = function(valor) {
    oldHod.apply(hodometro, arguments);
};
