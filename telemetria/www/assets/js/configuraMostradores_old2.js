velocimetro = new RadialGauge({
  renderTo: 'velocimetro',
  // width: 400,
  // height: 400,
  units: 'Km/h',
  title: false,
  value: 0,
  minValue: 0,
  maxValue: 50,
  majorTicks: [
    '0', '10', '20', '30', '40', '50'
  ],
  minorTicks: 1,
  strokeTicks: false,
  highlights: [{
    from: 0,
    to: 20,
    color: 'rgba(0,255,0,.15)'
  }, {
    from: 20,
    to: 30,
    color: 'rgba(255,255,0,.15)'
  }, {
    from: 30,
    to: 50,
    color: 'rgba(255,30,0,.25)'
  }],
  colorPlate: '#222',
  colorMajorTicks: '#f5f5f5',
  colorMinorTicks: '#ddd',
  colorTitle: '#fff',
  colorUnits: '#ccc',
  colorNumbers: '#eee',
  colorNeedle: 'rgba(240, 128, 128, 1)',
  colorNeedleEnd: 'rgba(255, 160, 122, .9)',
  valueBox: true,
  animationRule: 'bounce',
  animationDuration: 500
}).draw();
