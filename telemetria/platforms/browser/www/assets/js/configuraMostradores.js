var velocimetro = new Gauge(document.getElementById("velocimetro"));
var wattimetro = new Gauge(document.getElementById("wattimetro"));
var medidorTensao = new Gauge(document.getElementById("medidorTensao"));
var medidorCorrente = new Gauge(document.getElementById("medidorCorrente"));
var consumoInstantaneo = new Gauge(document.getElementById("consumoInstantaneo"));
var autonomiaInstantanea = new Gauge(document.getElementById(
  "autonomiaInstantanea"));
var temperaturaBaterias = new Gauge(document.getElementById(
  "temperaturaBaterias"));
var temperaturaCockpit = new Gauge(document.getElementById("temperaturaCockpit"));

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
