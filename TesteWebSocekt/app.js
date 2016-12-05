var ws = require("nodejs-websocket")

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Scream server example: "hi" -> "HI!!!"
var d = 0;
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
	try{
		console.log("Received "+str)
		var i1 = setInterval(function(){
			try{conn.sendText("{\"03\":"+getRandomArbitrary(0,50)+"}")}catch(e){clearInterval(i1);console.log(e)}
			},100);
		var i2 = setInterval(function(){
			try{conn.sendText("{\"01\":"+getRandomArbitrary(0,50)+"}")}catch(e){clearInterval(i2);console.log(e)}
			},100);
		var i3 = setInterval(function(){
			try{conn.sendText("{\"02\":"+getRandomArbitrary(0,30)+"}")}catch(e){clearInterval(i3);console.log(e)}			
			},100);
		var i4 = setInterval(function(){
			try{conn.sendText("{\"04\":"+d+"}")}catch(e){clearInterval(i4);console.log(e)}
			d++;
			},100);
		var i5 = setInterval(function(){
			try{conn.sendText("{\"05\":"+getRandomArbitrary(0,35)+"}")}catch(e){clearInterval(i5);console.log(e)}
			},100);        
		var i6 = setInterval(function(){
			try{conn.sendText("{\"06\":"+getRandomArbitrary(0,43)+"}")}catch(e){clearInterval(i6);console.log(e)}			
			},100);
	}catch(e){
		console.log(e);
	}
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
}).listen(81)
